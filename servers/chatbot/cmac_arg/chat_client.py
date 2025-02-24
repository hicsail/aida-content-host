print("configure chat client deps...")
import sys
import os
from rag import graph

print("RAG is set to use 'biosemiotics' sources")
os.environ["source_path"] = "PDFs/978-1-4020-9650-1.pdf"
os.environ["prompt_name"] = "biosemiotics_prompt"

from loaders import PdfLibLoader

# print("RAG is set to use 'poetry' sources")
# os.environ["source_path"] = "PDFs/The_Oxford_Book_of_English_Verse.pdf"
# os.environ["prompt_name"] = "poems_prompt"

def main():
    print("Welcome to the SIMPLE RAG Utility!")
    print("Type your query below.")
    print("Type 'exit' to quit the program.")

    while True:
        user_input = input(">>>: ")

        if user_input.lower() == 'exit':
            print("Goodbye!")
            sys.exit()

        response = answer(user_input)
        print(f"Answer: {response['answer']}")
        print(f"Context:")
        for document in response['context']:
            print(f"----------------{document.metadata}")
            print(document.page_content)
            

def answer(user_input):
    question_answer = graph.invoke({"question": user_input})
    return question_answer
    
    

if __name__ == "__main__":
    main()