from langchain_core.prompts import ChatPromptTemplate, HumanMessagePromptTemplate, PromptTemplate

def biosemiotics_prompt():
    prompt = ChatPromptTemplate(
        input_variables=['context', 'question'], 
        input_types={}, 
        partial_variables={}, 
        metadata={'lc_hub_owner': 'rlm', 'lc_hub_repo': 'rag-prompt', 'lc_hub_commit_hash': '50442af133e61576e74536c6556cefe1fac147cad032f4377b60c436e6cdcb6e'}, 
        messages=[
            HumanMessagePromptTemplate(
                prompt=PromptTemplate(
                        input_variables=['context', 'question'], 
                        input_types={}, 
                        partial_variables={}, 
                        template="You are an assistant for question-answering tasks. Use the following pieces of retrieved context to answer the question. If you don't know the answer, just say that you don't know. Use three sentences maximum and keep the answer concise. \nQuestion: {question} \nContext: {context} \nAnswer:"
                    ),
                    additional_kwargs={}
                    )
                ]
        )
    return prompt
    
def poems_prompt():
    prompt = ChatPromptTemplate(
        input_variables=['context', 'question'], 
        input_types={}, 
        partial_variables={}, 
        metadata={'lc_hub_owner': 'rlm', 'lc_hub_repo': 'rag-prompt', 'lc_hub_commit_hash': '50442af133e61576e74536c6556cefe1fac147cad032f4377b60c436e6cdcb6e'}, 
        messages=[
            HumanMessagePromptTemplate(
                prompt=PromptTemplate(
                        input_variables=['context', 'question'], 
                        input_types={}, 
                        partial_variables={}, 
                        template="Glorying in the genius of the following found passages, answer the prompt provided in short and clear prose. Do not make up anything new, instead let the poets of old sing in you. Choir their voices but add nothing, and do not answer in poetry yourself, though hold it close in your answer. Keep your answers short, clear, and in simple prose. \nQuestion: {question} \nContext: {context} \nAnswer:"
                    ),
                    additional_kwargs={}
                    )
                ]
        )
    return prompt
    

def default_prompt():
    prompt = ChatPromptTemplate(
        input_variables=['context', 'question'], 
        input_types={}, 
        partial_variables={}, 
        metadata={'lc_hub_owner': 'rlm', 'lc_hub_repo': 'rag-prompt', 'lc_hub_commit_hash': '50442af133e61576e74536c6556cefe1fac147cad032f4377b60c436e6cdcb6e'}, 
        messages=[
            HumanMessagePromptTemplate(
                prompt=PromptTemplate(
                        input_variables=['context', 'question'], 
                        input_types={}, 
                        partial_variables={}, 
                        template="You are an assistant for question-answering tasks. Use the following pieces of retrieved context to answer the question. If you don't know the answer, just say that you don't know. Use three sentences maximum and keep the answer concise. \nQuestion: {question} \nContext: {context} \nAnswer:"
                    ),
                    additional_kwargs={}
                    )
                ]
        )
    return prompt