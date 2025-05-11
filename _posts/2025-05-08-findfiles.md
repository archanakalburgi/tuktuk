---
layout: post
title: Semantic File Search with LangChain and Chroma
date: 2025-05-08 10:20:26 +0000
categories: [semantic-search, langchain, chroma, vectorstore, python]
tags: [langchain, chroma, embeddings, watchdog, openai, cli]
description: A walkthrough of a semantic file search assistant that indexes local documents and enables intelligent retrieval using vector embeddings. 
image: /assets/images/findfiles.png
---

## Introduction

While traditional file systems excel at storage and organization, they often fall short when it comes to understanding and surfacing relevant content based on user intent.

This project introduces a modular, Python-based pipeline to convert a monitored folder into a semantically searchable index using LangChain, OpenAI embeddings, and the Chroma vector database.

This blog details:
- The architectural components and their responsibilities
- How the system processes new files automatically
- A CLI for real-time search and file discovery
- Implementation design principles like separation of concerns

While also outlining how this system serves as a launchpad for more intelligent document assistants using Retrieval-Augmented Generation (RAG).

## Why Semantic Search for Local Files?

Many of us including organizations face challenges in information retrieval due to:
- Inconsistent or missing metadata
- Content distributed across local and network drives
- Difficulty in locating documents through traditional keyword search

By converting documents into vector embeddings via OpenAI models and indexing them in Chroma, the system supports semantic search, improving retrieval over traditional string-based lookup.

## System Architecture

The project is divided into modular components:

- **monitoring.py**: \
  - Sets up a `Watchdog` observer to monitor a specified directory for file system events. Detects new file creations and deletions and triggers appropriate processing or cleanup in real-time.
- **file_handler.py**: \
  - Handles file-level processing. Extracts text content from PDFs using `PyMuPDFLoader`, splits the text into overlapping chunks with `RecursiveCharacterTextSplitter`, generates OpenAI embeddings, and stores them in the Chroma vector store with associated metadata.
- **store.py**: \
  - Initializes the Chroma vector database with OpenAI embedding functions. Provides methods to interact with the vector store, including document insertion and document-level deletion based on file path metadata.
- **utils.py**: \
  - Provides utility functions to validate directory paths and perform batch preprocessing of all existing PDF files in a given directory, ensuring they are indexed in the vector store prior to monitoring.
- **main.py**: \
  - Serves as the entry point for the CLI application. Initializes the vector store, processes existing files, starts the folder monitoring observer, and manages user input for semantic search and new file processing.

This sepration of concerns ensures testability, reusability, and the ability to plug this into larger pipelines (e.g., Slack bots, dashboards, APIs).

### Architecture Flow:

<p align="center">
 <img width="600" height="400" src="{{ site.baseurl }}/assets/images/findfiles_architecture.png">
</p>
---

## Step-by-Step Breakdown

### 1. Initialize the Vector Store
```python
from vector_store.store import initialize_vector_store
vector_store = initialize_vector_store()
```

This sets up OpenAI embeddings and the Chroma vector database. Embeddings are tagged with file metadata (`file_path`).

### 2. Start Monitoring Folder
```python
observer, file_event_handler = start_monitoring(directory, vector_store)
process_existing_files(directory, vector_store)
```

New PDF files are detected using Watchdog, queued, and automatically processed.

### 3. Text Extraction & Chunking
```python
loader = PyMuPDFLoader(file_path)
docs = loader.load()
splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
splits = splitter.split_documents(docs)
```

Text is split into overlapping chunks to improve retrieval quality.

### 4. Add to Chroma
```python
vector_store.add_texts(
  texts=[doc.page_content for doc in splits],
  metadatas=[{"file_path": file_path}] * len(splits)
)
```

Each chunk is stored in Chroma with associated metadata, enabling semantic similarity search.

### 5. Run a Search Query
```python
results = vector_store.similarity_search(query="documents for NY tax filing", k=1)
```

Results return the best matching documents, based on the embedded meaning of the query.

### 6. Handle Deletions
```python
vector_store.delete_document("/path/to/file.pdf")
```

When a file is deleted from the folder, its embeddings are also removed.

## CLI Interaction Sample
```
$ python main.py
Enter the folder to monitor: /path/to/folder
Processing existing files in the directory: /path/to/folder
File monitoring started.

What would you like to do?
1. Search for a file
2. Add a file to the monitored folder
> 1
Enter your search query: file to file tax in NY
Matching file found: /path/to/folder/W2_2024.pdf
```

## What's Next

The current system retrieves the single most relevant document for a given query. The next version will support intent-based search that returns a curated set of related documents.

For example, when a user asks:

> "Documents required to file taxes in New York?"

The system will respond with:
- W2
- State 1040
- Receipts
- Deduction summaries

And return their path. Each file will be selected semantically and grouped as part of a complete response.

Enhancements on the roadmap include:
– Building intelligence to extract task-specific insights (e.g., understanding what’s required to file taxes)
– Expanding support for additional file types beyond PDFs

## Conclusion

This system enables real-time semantic search over local documents using LangChain, Chroma, and OpenAI embeddings. It automatically indexes new PDFs and supports natural language querying through a command-line interface.

Future iterations will incorporate multi-file reasoning and natural language generation, transforming this utility into a more advanced tool for file discovery and task-specific document retrieval.
