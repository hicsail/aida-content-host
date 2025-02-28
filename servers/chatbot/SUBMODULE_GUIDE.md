# Developer Notes

This document provides guidelines on managing the submodule **`cmac_arg`** and ensuring smooth integration with the main project.

## Submodule Overview

The `cmac_arg` submodule is an external dependency responsible for running the chat client. It contains logic for document-based retrieval-augmented generation (RAG) and other AI-driven features.

## (Current) Integration with Main Application

The main project does **not** directly modify the submodule but instead interfaces with it using the following file:

- `loaders.py`
- `rag.py`

## Note for Submodule Developer

As the submodule is actively maintained, please ensure the following when making updates:

### 1. Provide a New Callable Interface

Provide a new file `api.py` at root level of the project. Expose all method that the main project can call. Expected methods are the following:

- `process_query(question: str, cluster: str)`

Example usage:

```
import api

question = "What is the importance of learning to think in new ways?"
cluster = "education"
response = api.process_query(question, education)
```

### 2. Ensure Backward Compatibility

- Any updates should not break existing integrations.
- If breaking changes are unavoidable, notify maintainers of the main project in advance.
