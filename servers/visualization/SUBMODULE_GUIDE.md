# Developer Notes

This document provides guidelines on managing the submodule **`genai-interactive-topics`** and ensuring smooth integration with the main project.

## Submodule Overview

The `genai-interactive-topics` submodule is responsible for running the **BERTopic-based topic modeling** and visualization component. It includes **clustering, topic extraction, and an interactive dashboard**.

## (Current) Integration with Main Application

The main project does **not** modify the submodule but instead interacts with it via **Docker** and API calls. The submodule is wrapped using `Dockerfile`.

## Note for Submodule Developer

As the submodule is actively maintained, please ensure the following when making updates:

### 1. Ensure Backward Compatibility

- Any updates should not break existing integrations.
- If breaking changes are unavoidable, notify maintainers of the main project in advance.
