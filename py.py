import os
import sys
import time
import openai
import requests


from pathlib import Path


openai.api_key = ("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")
openai.Model.list()

open_prompt = 'I am a highly skilled software engineer with a passion for building scalable web applications. I have experience working with a variety of technologies including Python, Django, JavaScript, React, and PostgreSQL. I am currently looking for a full-time position as a software engineer.'

question = "What is the best way to get a job at your company?"

response = openai.ChatCompletion.create(
  model="gpt-3.5-turbo",
  messages=[
        {"role": "system", "content": open_prompt},
        {"role": "user", "content": f"My employer asked me a question,{question}"},
        # {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
        # {"role": "user", "content": "Where was it played?"},
        ],
  temperature=0.7,
  max_tokens=3500,
  top_p=1,
  frequency_penalty=0,
  presence_penalty=0
)

print(response['choices'][0]['message']['content'])


def count_files_in_dir(directory):
    file_count = 0
    for root, dirs, files in os.walk(directory):
        file_count += len(files)
    return file_count


# replace this with your directory path
directory = '/Users/zachrizzo/programing/ama_empoyee_website/components'
file_count = count_files_in_dir(directory)
print(
    f'There are {file_count} files in the directory "{directory}" and its subfolders.')
