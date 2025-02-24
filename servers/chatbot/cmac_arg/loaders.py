print("loading config deps...")
import os
from rag import OpenAIEmbeddings

print("configure loader deps...")
import bs4
from langchain_chroma import Chroma
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import CharacterTextSplitter

class PdfLibLoader:
    print ("making PdfLoader in Chroma")
    loader = PyPDFLoader(
        file_path = os.environ["source_path"]
    )
    docs = loader.load()
    text_splitter = CharacterTextSplitter(
        separator=".",
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len,
        is_separator_regex=False,
    )
    all_splits = text_splitter.split_documents(docs)
    # Index chunks
    db = Chroma.from_documents(all_splits, OpenAIEmbeddings())


# class ProclusLoader:
#     print("making ProclusLoader in memory")
#     loader = WebBaseLoader(
#             web_paths=("https://www.esotericarchives.com/proclus/metaelem.htm",),
#             default_parser='html.parser',
#             # bs_kwargs=dict(parse_only=bs4.SoupStrainer("p")),
#             bs_get_text_kwargs={"strip": True}
#         )
#     docs = loader.load()

#     # text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
#     text_splitter = CharacterTextSplitter(
#         separator=".",
#         chunk_size=1000,
#         chunk_overlap=200,
#         length_function=len,
#         is_separator_regex=False,
#     )
#     all_splits = text_splitter.split_documents(docs)
#     # Index chunks
#     load = vector_store.add_documents(documents=all_splits)