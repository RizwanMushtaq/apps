import math

import numpy as np
from scipy.spatial.distance import cdist
from sentence_transformers import SentenceTransformer


documents = [
    "Bugs introduced by the intern had to be squashed by the lead developer.",
    "Bugs found by the quality assurance engineer were difficult to debug.",
    "Bugs are common throughout the warm summer months, according to the entomologist.",
    "Bugs, in particular spiders, are extensively studied by arachnologists.",
]


# Pairwise helper functions for explaining the metrics.
def euclidean_distance_fn(vector1: np.ndarray, vector2: np.ndarray) -> float:
    squared_sum = sum((x - y) ** 2 for x, y in zip(vector1, vector2))
    return math.sqrt(squared_sum)


def dot_product_fn(vector1: np.ndarray, vector2: np.ndarray) -> float:
    return float(sum(x * y for x, y in zip(vector1, vector2)))


def cosine_similarity_matrix(vectors: np.ndarray) -> np.ndarray:
    norms = np.linalg.norm(vectors, axis=1, keepdims=True)
    normalized = vectors / np.clip(norms, 1e-12, None)
    return normalized @ normalized.T


def print_title(text: str) -> None:
    print("\n" + "=" * 78)
    print(text)
    print("=" * 78)


model = SentenceTransformer("paraphrase-MiniLM-L6-v2")
embeddings = model.encode(documents)

np.set_printoptions(precision=3, suppress=True)

print("Embeddings shape:", embeddings.shape)
print("Embeddings (first 8 dims of each vector):")
for i, emb in enumerate(embeddings, start=1):
    print(f"  Doc {i}: {emb[:8]} ...")

# 1) Euclidean distance (smaller means more similar)
print_title("1) Euclidean Distance")
l2_dist = cdist(embeddings, embeddings, metric="euclidean")
print("Pairwise Euclidean distance matrix:")
print(l2_dist)
print(
    "Doc1 distances -> Doc2/Doc3/Doc4:",
    euclidean_distance_fn(embeddings[0], embeddings[1]),
    euclidean_distance_fn(embeddings[0], embeddings[2]),
    euclidean_distance_fn(embeddings[0], embeddings[3]),
)

# 2) Dot product (larger can mean more similar, but magnitude affects score)
print_title("2) Dot Product")
dot_matrix = np.matmul(embeddings, embeddings.T)
print("Pairwise dot-product matrix:")
print(dot_matrix)
print(
    "Doc1 dot products -> Doc2/Doc3/Doc4:",
    dot_product_fn(embeddings[0], embeddings[1]),
    dot_product_fn(embeddings[0], embeddings[2]),
    dot_product_fn(embeddings[0], embeddings[3]),
)

# 3) Cosine similarity (range about [-1, 1], and usually best for text embeddings)
print_title("3) Cosine Similarity")
cos_matrix = cosine_similarity_matrix(embeddings)
print("Pairwise cosine-similarity matrix:")
print(cos_matrix)
print(
    "Doc1 cosine similarity -> Doc2/Doc3/Doc4:",
    cos_matrix[0, 1],
    cos_matrix[0, 2],
    cos_matrix[0, 3],
)

print_title("Quick Comparison Summary")
print("Euclidean: lower value = closer vectors (depends on vector scale).")
print(
    "Dot product: higher value = more aligned, but also larger when vectors are long."
)
print(
    "Cosine similarity: compares angle only, ignores vector length, best default for semantic text search."
)
