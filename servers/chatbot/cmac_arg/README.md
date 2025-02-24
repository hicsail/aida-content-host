Overview:
This implimentation of Langchain will serve as the back-end for JHA's ethics chatbot.

Use:

python chat_client.py 

runs the chatbot in a terminal window. This will be replaced with a REST API.

Files:
chat_client.py - runs the chat in terminal. Sets env variables to toggle between RAG modes (demo modes are poetry and biosemiotics)
loaders.py - manages PDF parsing for vector database creation
prompts.py - stores domain specific NLP prompts (TODO: DRY this out)
rag.py - LangChain configs

All files have fairly verbose putsing for debugging. 
