# Developer Notes

This document provides guidelines on managing the submodule **`genai-interactive-topics`** and ensuring smooth integration with the main project.

## Submodule Overview

The `genai-interactive-topics` submodule is responsible for running the **BERTopic-based topic modeling** and visualization component. It includes **clustering, topic extraction, and an interactive dashboard**.

## (Current) Integration with Main Application

Latest integration does not have any dependencies on the original repository. Topic models that are used will be stored in this repository. Future work may need to move this dependency to the original repository; however, this implementation requires the training device has to be `cpu`. `cuda` and `mps` will not be supported in deployment environment so far.

## Note for Submodule Developer

As the submodule is actively maintained, please ensure the following when making updates:

### 1. Ensure Backward Compatibility

- Any updates should not break existing integrations.
- If breaking changes are unavoidable, notify maintainers of the main project in advance.
