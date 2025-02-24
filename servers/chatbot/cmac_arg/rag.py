print("load RAG deps")
import prompts
import os
import credentials

if not os.environ.get("OPENAI_API_KEY"):
  os.environ["OPENAI_API_KEY"] = credentials.openai_key()

print("configure llm...")
from langchain_openai import ChatOpenAI
llm = ChatOpenAI(model="gpt-4o-mini")
print("configure embedding...")
from langchain_openai import OpenAIEmbeddings
embeddings = OpenAIEmbeddings(model="text-embedding-3-large")
print("configure vector store")
from langchain_core.vectorstores import InMemoryVectorStore
vector_store = InMemoryVectorStore(embeddings)

from langchain import hub
from langchain_core.documents import Document
# from langchain_core.prompts import ChatPromptTemplate, HumanMessagePromptTemplate, PromptTemplate
from langgraph.graph import START, StateGraph
from typing_extensions import List, TypedDict


# Define state for application
class State(TypedDict):
    question: str
    context: List[Document]
    answer: str


# Define application steps
def retrieve(state: State):
    from loaders import PdfLibLoader
    print("-----retrieve")
    # retrieved_docs = vector_store.similarity_search(state["question"])
    retrieved_docs = PdfLibLoader().db.similarity_search(state["question"])
    return {"context": retrieved_docs}


def generate(state: State):
    print("-----generate")
    chosen_prompt = getattr(prompts, os.environ["prompt_name"])

    docs_content = "\n\n".join(doc.page_content for doc in state["context"])
    messages = chosen_prompt().invoke({"question": state["question"], "context": docs_content})
    response = llm.invoke(messages)
    return {"answer": response.content}

# Compile application and test
graph_builder = StateGraph(State).add_sequence([retrieve, generate])
graph_builder.add_edge(START, "retrieve")
graph = graph_builder.compile()