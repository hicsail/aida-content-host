import os
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from scipy.cluster.hierarchy import linkage
from scipy.cluster.hierarchy import fcluster
from bertopic import BERTopic
import json
import numpy as np
from bertopic import BERTopic
from dash import html

def load_bertopic_model(model_dir):
    model_path = os.path.join(model_dir, 'topic_model.pkl')
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found at: {model_path}")
    
    return BERTopic.load(model_path)

def load_json_files(model_dir):
    keywords_path = os.path.join(model_dir, 'topic_keywords_with_labels_gpt.json')
    sizes_path = os.path.join(model_dir, 'topic_sizes_with_labels_gpt.json')

    if not os.path.exists(keywords_path):
        raise FileNotFoundError(f"Keywords file not found at: {keywords_path}")
    
    with open(keywords_path, 'r') as f:
        topic_keywords_with_labels = json.load(f)
    
    if not os.path.exists(sizes_path):
        raise FileNotFoundError(f"Sizes file not found at: {sizes_path}")
    
    with open(sizes_path, 'r') as f:
        topic_sizes = json.load(f)
        
    return topic_keywords_with_labels, topic_sizes
    
def load_cluster_descriptions(model_dir):
    des_path = os.path.join(model_dir, 'cluster_descriptions_gpt.json')

    if not os.path.exists(des_path):
        raise FileNotFoundError(f"Keywords file not found at: {des_path}")
    
    with open(des_path, 'r') as f:
        cluster_descriptions = json.load(f)

    return cluster_descriptions

def save_cluster_descriptions_to_json(model_dir, cluster_descriptions, output_filename="cluster_descriptions.json"):
    cluster_descriptions = {int(key): value for key, value in cluster_descriptions.items()}

    with open(os.path.join(model_dir, output_filename), "w", encoding="utf-8") as file:
        json.dump(cluster_descriptions, file, ensure_ascii=False, indent=4)

def cluster_topics(coords, random_state=42):
    np.random.seed(random_state)

    x_vals = coords['x']
    y_vals = coords['y']

    coordinates = np.vstack((x_vals, y_vals)).T
    scaler = StandardScaler()
    scaled_coords = scaler.fit_transform(coordinates)

    linkage_matrix = linkage(scaled_coords, method='ward')
    clusters = fcluster(linkage_matrix, t=1, criterion='distance')
    
    return clusters

def order_clusters_by_importance(clusters, coords, random_state=42):
    np.random.seed(random_state)
    x_vals = coords['x']
    y_vals = coords['y']
    coordinates = np.vstack((x_vals, y_vals)).T

    scaler = StandardScaler()
    scaled_coords = scaler.fit_transform(coordinates)

    pca = PCA(n_components=2, random_state=random_state)
    pca_coords = pca.fit_transform(scaled_coords)
    explained_variance = pca.explained_variance_ratio_
    
    cluster_variance = {}
    for cluster_id in np.unique(clusters):
        cluster_points = pca_coords[np.array(clusters) == cluster_id]
        cluster_variance[cluster_id] = np.sum(np.var(cluster_points, axis=0) * explained_variance)

    ordered_clusters = sorted(cluster_variance.items(), key=lambda x: x[1], reverse=True)

    return ordered_clusters

def display_keywords(topic_label, topic_keywords_with_labels):
    if topic_label in topic_keywords_with_labels:
        keywords = topic_keywords_with_labels[topic_label]

        return [html.H4(f"Top Keywords for {topic_label}", className="card-title"),
                html.P(f"{', '.join(keywords)}", className="card-text", style={"fontSize": "16px"})]
    
    return html.P("No keywords available.", style={"fontSize": "16px", "color": "black"})
