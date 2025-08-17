import { gql } from '@apollo/client'

// Queries
export const GET_CONVERSATIONS = gql`
  query GetConversations {
    conversations {
      id
      title
      createdAt
      updatedAt
      messageCount
    }
  }
`

export const GET_MESSAGES = gql`
  query GetMessages($conversationId: String!) {
    messages(conversationId: $conversationId) {
      id
      conversationId
      content
      type
      role
      timestamp
      metadata
    }
  }
`

export const GET_WEATHER = gql`
  query GetWeather($city: String!) {
    weather(city: $city) {
      city
      temperature
      description
      humidity
      windSpeed
      icon
    }
  }
`

export const SEARCH_KNOWLEDGE = gql`
  query SearchKnowledge($query: String!) {
    searchKnowledge(query: $query) {
      id
      title
      content
      source
      tags
      createdAt
      similarity
    }
  }
`

// Mutations
export const SEND_MESSAGE = gql`
  mutation SendMessage($input: SendMessageInput!) {
    sendMessage(input: $input) {
      userMessage {
        id
        conversationId
        content
        type
        role
        timestamp
        metadata
      }
      botMessage {
        id
        conversationId
        content
        type
        role
        timestamp
        metadata
      }
    }
  }
`

export const CREATE_CONVERSATION = gql`
  mutation CreateConversation($title: String) {
    createConversation(title: $title) {
      id
      title
      createdAt
      updatedAt
      messageCount
    }
  }
`

export const DELETE_CONVERSATION = gql`
  mutation DeleteConversation($id: String!) {
    deleteConversation(id: $id)
  }
`

export const ADD_KNOWLEDGE = gql`
  mutation AddKnowledge($input: AddKnowledgeInput!) {
    addKnowledge(input: $input) {
      id
      title
      content
      source
      tags
      createdAt
    }
  }
`