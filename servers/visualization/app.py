import numpy as np
import plotly.graph_objects as go
import dash
from dash import dcc, html, ALL, ctx
from dash.dependencies import Input, Output, State
import plotly.graph_objects as go
import dash_bootstrap_components as dbc
from flask import Flask

from utils import *

server = Flask(__name__)

dash_app = {}

def create_dash_app(model_directory, route_path):
    topic_model = load_bertopic_model(model_directory)
    topic_keywords_with_labels, topic_sizes = load_json_files(model_directory)
    coords = np.load(model_directory+"/intertopic_coords.npz")
    cluster_descriptions = load_cluster_descriptions(model_directory)

    label_to_id = {label: topic_id for topic_id, label in enumerate(topic_keywords_with_labels.keys())}
    topic_labels = list(topic_keywords_with_labels.keys())

    app = dash.Dash(
        __name__,
        server=server,
        routes_pathname_prefix=f"/{route_path}/"
    )

    def create_intertopic_distance_plot(coords, highlighted_label=None):
        x_vals = coords['x']
        y_vals = coords['y'] + 0.01
    
        def add_jitter(values, jitter_strength=0.5):
            np.random.seed(4)
            return values + np.random.uniform(-jitter_strength, jitter_strength, size=len(values),)
    
        x_vals = add_jitter(x_vals)
        y_vals = add_jitter(y_vals)
    
        hover_texts = [
            f"Topic: {label}<br>Documents: {topic_sizes.get(label,0)}<br>Keywords: {', '.join(topic_keywords_with_labels[label])}"
            for label in topic_labels
        ]
        marker_colors = ['#c00' if label == highlighted_label else '#ffcccc' for label in topic_labels]
    
        max_size = max(topic_sizes.values())
        min_size = min(topic_sizes.values())
    
        scale_factor = 0.7
        marker_sizes = [
            15 + (size - min_size) ** scale_factor / (max_size - min_size) ** scale_factor * 20
            for size in topic_sizes.values()
        ]
    
        scatter_trace = go.Scatter(
            x=x_vals,
            y=y_vals,
            mode='markers',
            text=topic_labels,
            hovertext=hover_texts,
            hoverinfo='text',
            marker=dict(size=marker_sizes, color=marker_colors, line=dict(width=1.5, color='black')),
            textposition='bottom center',
            textfont=dict(size=12, color='black')
        )
    
        fig = go.Figure(data=[scatter_trace])
        fig.update_layout(
            title="Intertopic Distance Map",
            xaxis=dict(showgrid=False, zeroline=True, showline=True, mirror=True, tickmode='array', tickvals=[], linecolor='black', linewidth=1),
            yaxis=dict(showgrid=False, zeroline=True, showline=True, mirror=True, tickmode='array', tickvals=[], linecolor='black', linewidth=1),
            plot_bgcolor="white",
            paper_bgcolor="white",
            autosize=True,
        )
        return fig

    def visualize_topic_term_single(topic_model, topic_label, topic_keywords_with_labels, n_words=10) -> go.Figure:
        if topic_label in topic_keywords_with_labels:
            topic_id = label_to_id.get(topic_label)
            if topic_id is not None:
                words_and_scores = topic_model.get_topic(topic_id)[:n_words]
                words = [word for word, _ in words_and_scores][::-1]
                scores = [score for _, score in words_and_scores][::-1]
    
                fig = go.Figure(go.Bar(x=scores, y=words, orientation="h", marker_color="#c00"))
                fig.update_layout(
                    title=f"Top {n_words} Keywords for Topic {topic_label}",
                    xaxis_title="Weight",
                    yaxis_title="Keywords",
                    template="plotly_white"
                )
                return fig
        return go.Figure()
    
    app.layout = dbc.Container([
        dbc.Row([
            html.H3("Interactive Topic Model", className="display-4"),
        ]),
        dbc.Row([
            dbc.Col([
                html.H5("Select a topic in the dropdown below:", className="lead"),
                html.Div([
                    html.Div(
                        id="topic-options",
                        children=[
                            html.Div(
                                label,
                                id={'type': 'radio-label', 'index': label},
                                className="radio-item",
                                n_clicks=0
                            ) for label in topic_keywords_with_labels.keys()
                        ],
                        className="radio-container"
                    ),
                    dcc.Store(id="selected-topic", data=""),
                ], className="select-control-area"),
                dbc.Button("Reset View", id="reset-button", color="primary", className="mt-3"),
            ], className="select-control"),
    
            dbc.Col([
                dcc.Graph(id='intertopic-plot', figure=create_intertopic_distance_plot(coords), style={"height": "100%"}),
            ], className="select-plot")
        ], className="topic-select-container"),
    
        dbc.Row([
            dbc.Col([
                dcc.Graph(id="term-bar-chart", style={"height": "720px"})
            ], width=6)
    
        ]),
    
        dbc.Row([
            dbc.Col([
                html.Div(id='cluster-descriptions', className="cluster-descriptions")
            ])
        ])
    ], fluid=True)

    @app.callback(
        [Output('intertopic-plot', 'figure'),
         Output('term-bar-chart', 'figure')],
        [Input('selected-topic', 'data'),
         Input('intertopic-plot', 'clickData'),
         Input('reset-button', 'n_clicks')],
        [State('selected-topic', 'data')])
    def update_plot_and_display(selected_label, click_data, reset_clicks, current_label):
        ctx = dash.callback_context
        triggered = ctx.triggered[0]['prop_id']
    
        if triggered == 'reset-button.n_clicks':
            return create_intertopic_distance_plot(coords), go.Figure()
    
        if triggered == 'intertopic-plot.clickData':
            clicked_label = click_data['points'][0]['text']
            selected_label = clicked_label
    
        if selected_label:
            intertopic_plot = create_intertopic_distance_plot(coords, highlighted_label=selected_label)
            term_bar_chart = visualize_topic_term_single(topic_model, selected_label, topic_keywords_with_labels)
            return intertopic_plot, term_bar_chart
    
        return create_intertopic_distance_plot(coords), go.Figure()
    
    @app.callback(
        Output('cluster-descriptions', 'children'),
        Input('reset-button', 'n_clicks')
    )
    def update_cluster_descriptions(n_clicks):
        descriptions = [html.P(description) for description in cluster_descriptions.values()]
        return descriptions
    
    @app.callback(
        Output({'type': 'radio-label', 'index': ALL}, 'className'),
        Input("selected-topic", "data"),
        [State({'type': 'radio-label', 'index': ALL}, 'id')]
    )
    def update_selected_class(selected_label, all_ids):
        if not selected_label:
            return ["radio-item"] * len(all_ids)

        return [
            "radio-item selected" if id["index"] == selected_label else "radio-item"
            for id in all_ids
        ]
    
    @app.callback(
        Output("selected-topic", "data"),
        [Input({'type': 'radio-label', 'index': ALL}, 'n_clicks'),
        Input("reset-button", "n_clicks")],
        prevent_initial_call=True
    )
    def update_selected_topic(clicks, reset_clicks):
        if ctx.triggered_id == "reset-button":
            return ""

        if not ctx.triggered:
            return ""

        clicked_index = ctx.triggered_id["index"] if isinstance(ctx.triggered_id, dict) else None

        return clicked_index

        
    dash_app[route_path] = app

create_dash_app("model_info/model_info_all", "all")
create_dash_app("model_info/model_info_business", "business")
create_dash_app("model_info/model_info_education", "education")
create_dash_app("model_info/model_info_government", "government")
create_dash_app("model_info/model_info_others", "others")

if __name__ == "__main__":
    server.run(host="0.0.0.0", port=5001)
