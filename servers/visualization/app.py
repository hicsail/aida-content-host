import os
import sys
import openai
import numpy as np
import plotly.graph_objects as go
import dash
from dash import dcc, html
from dash.dependencies import Input, Output, State
import plotly.graph_objects as go
import dash_bootstrap_components as dbc

from utils import *

def main(directory, rerun=False, key=None):
    # Load the BERTopic model and files   
    model_dir = directory
    openai.api_key = key
    topic_model = load_bertopic_model(model_dir)
    topic_keywords_with_labels, topic_sizes = load_json_files(model_dir)
    coords = np.load(model_dir+"/intertopic_coords.npz")

    # Mapping of topic labels to topic IDs
    label_to_id = {label: topic_id for topic_id, label in enumerate(topic_keywords_with_labels.keys())}
    topic_labels = list(topic_keywords_with_labels.keys())

    cluster_descriptions = load_cluster_descriptions(model_dir)
    
    # Initialize the Dash app with a Bootstrap theme
    app = dash.Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP])
    
    def create_intertopic_distance_plot(coords, highlighted_label=None):
        x_vals = coords['x']
        y_vals = coords['y']+0.01
    
        # Add jitter to reduce overlap
        def add_jitter(values, jitter_strength=0.5):
            np.random.seed(4)
            return values + np.random.uniform(-jitter_strength, jitter_strength, size=len(values),)
    
        x_vals = add_jitter(x_vals)
        y_vals = add_jitter(y_vals)
    
        hover_texts = [
            f"Topic: {label}<br>Documents: {topic_sizes.get(label,0)}<br>Keywords: {', '.join(topic_keywords_with_labels[label])}"
            for label in topic_labels]
        marker_colors = ['red' if label == highlighted_label else 'lightblue' for label in topic_labels]
    
        # Normalize and invert the marker sizes
        max_size = max(topic_sizes.values())
        min_size = min(topic_sizes.values())
    
        scale_factor = 0.7
        marker_sizes = [
            15 + (size - min_size) ** scale_factor / (max_size - min_size) ** scale_factor * 20
            for size in topic_sizes.values()]
    
        scatter_trace = go.Scatter(
            x=x_vals,
            y=y_vals,
            mode='markers',
            text=topic_labels,
            hovertext=hover_texts,
            hoverinfo='text',
            marker=dict(size=marker_sizes, color=marker_colors, line=dict(width=1.5, color='black')),
            textposition='bottom center',
            textfont=dict(size=12, color='black'))
    
        fig = go.Figure(data=[scatter_trace])
        fig.update_layout(
            title="Intertopic Distance Map",
            xaxis=dict(
                showgrid=False,  # Remove grid lines
                zeroline=True,  # Ensure x-axis line is drawn
                showline=True,  # Explicitly draw x-axis line
                mirror=True,  # Mirror the axis for a clean look
                tickmode='array',  # Avoid auto ticks
                tickvals=[],  # Remove tick labels
                linecolor='black',  # Ensure axis lines are visible
                linewidth=1  # Set axis line thickness
            ),
            yaxis=dict(
                showgrid=False,  # Remove grid lines
                zeroline=True,  # Ensure y-axis line is drawn
                showline=True,  # Explicitly draw y-axis line
                mirror=True,  # Mirror axis for symmetry
                tickmode='array',  # Avoid auto ticks
                tickvals=[],  # Remove tick labels
                linecolor='black',  # Ensure axis lines are visible
                linewidth=1  # Set axis line thickness
            ),
            plot_bgcolor="white",  # White background
            paper_bgcolor="white",  # White canvas
            autosize=True,
        )
        return fig

    # Function to create a bar chart of top keywords and their weights for a specific topic
    def visualize_topic_term_single(topic_model, topic_label, topic_keywords_with_labels, n_words=10) -> go.Figure:
        if topic_label in topic_keywords_with_labels:
            topic_id = label_to_id.get(topic_label)
            if topic_id is not None:
                words_and_scores = topic_model.get_topic(topic_id)[:n_words]
                words = [word for word, _ in words_and_scores][::-1]  # Reverse order for display
                scores = [score for _, score in words_and_scores][::-1]  # Reverse order for display
    
                fig = go.Figure(go.Bar(x=scores, y=words, orientation="h", marker_color="#636EFA",))
                fig.update_layout(
                    title=f"Top {n_words} Keywords for Topic {topic_label}",
                    xaxis_title="Weight",
                    yaxis_title="Keywords",
                    template="plotly_white")
                return fig
        return go.Figure()
    
    # App layout
    app.layout = dbc.Container([
        dbc.Row([
            dbc.Col([
                html.H2("Interactive Topic Model", className="display-4"),
                html.Hr(),
                html.P("Select a topic using the buttons or the dropdown below:", className="lead"),
                html.Button('Previous Topic', id='prev-topic', n_clicks=0),
                html.Button('Next Topic', id='next-topic', n_clicks=0),
                dcc.RadioItems(
                    id="topic-selector",
                    options=[{'label': label, 'value': label} for label in topic_keywords_with_labels.keys()],
                    labelStyle={'display': 'block'},
                    style={"height": "300px", "overflowY": "scroll"},
                ),
                dbc.Button("Reset View", id="reset-button", color="primary", className="mt-3"),
            ], width=3),
    
            dbc.Col([
                dcc.Graph(id='intertopic-plot', figure=create_intertopic_distance_plot(coords)),
            ], width=9)
        ], className="mb-4"),
    
        dbc.Row([
            dbc.Col([
                dbc.Card([
                    dbc.CardBody([
                        html.Div(id='keyword-display')
                    ])
                ], style={"height": "100%", "backgroundColor": "#e3f2fd"})
            ], width=6),
    
            dbc.Col([
                dcc.Graph(id="term-bar-chart", style={"height": "500px"})
            ], width=6)
    
        ]),
    
        dbc.Row([
            dbc.Col([
                html.Div(id='cluster-descriptions', style={"marginTop": "20px", "padding": "10px", "backgroundColor": "#f0f8ff", "borderRadius": "10px"})
            ])
        ])
    ], fluid=True)

    # Callbacks for interactivity
    @app.callback(
        [Output('intertopic-plot', 'figure'),
         Output('keyword-display', 'children'),
         Output('term-bar-chart', 'figure')],
        [Input('topic-selector', 'value'),
         Input('intertopic-plot', 'clickData'),
         Input('reset-button', 'n_clicks')],
        [State('topic-selector', 'value')])
    def update_plot_and_display(selected_label, click_data, reset_clicks, current_label):
        ctx = dash.callback_context
        triggered = ctx.triggered[0]['prop_id']
    
        if triggered == 'reset-button.n_clicks':
            # Reset view and clear selections
            return create_intertopic_distance_plot(coords), \
                   html.H5("Select a topic to see the top keywords.", style={"fontSize": "18px", "color": "black"}), \
                   go.Figure()
    
        if triggered == 'intertopic-plot.clickData':
            # Handle node click
            clicked_label = click_data['points'][0]['text']
            selected_label = clicked_label
    
        if selected_label:
            # Highlight selected topic
            intertopic_plot = create_intertopic_distance_plot(coords, highlighted_label=selected_label)
            keywords_display = display_keywords(selected_label, topic_keywords_with_labels)
            term_bar_chart = visualize_topic_term_single(topic_model, selected_label, topic_keywords_with_labels)
            return intertopic_plot, keywords_display, term_bar_chart
    
        return create_intertopic_distance_plot(coords), \
               html.H5("Select a topic to see the top keywords.", style={"fontSize": "18px", "color": "black"}), \
               go.Figure()

    # Update cluster descriptions
    @app.callback(
        Output('cluster-descriptions', 'children'),
        Input('reset-button', 'n_clicks')
    )
    def update_cluster_descriptions(n_clicks):
        descriptions = [html.P(description) for description in cluster_descriptions.values()]
        return descriptions
    
    # Navigation buttons to cycle through topics
    @app.callback(
        Output('topic-selector', 'value'),
        [Input('prev-topic', 'n_clicks'), Input('next-topic', 'n_clicks')],
        [State('topic-selector', 'value')]
    )
    def navigate_topics(prev_clicks, next_clicks, current_value):
        current_index = topic_labels.index(current_value) if current_value else 0
        if prev_clicks > 0 and current_index > 0:
            return topic_labels[current_index - 1]
        elif next_clicks > 0 and current_index < len(topic_labels) - 1:
            return topic_labels[current_index + 1]
        return current_value
    
    def reset_view(n_clicks):
        if n_clicks:
            return None  # Reset topic selection to None

    # Run the app
    app.run_server(debug=True, port=8092)


if __name__ == "__main__":
    main("model_info/model_info_all")
