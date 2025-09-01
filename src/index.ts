export const EntitySchema = {
  title: 'Entity Schema',
  description: 'Represents a pointer to some thing as a URI.',
  type: 'object' as const,
  properties: {
    id: {
      type: 'string' as const,
      format: 'uri' as const,
      description: 'A URI to a particular thing.'
    }
  },
  required: ['id'] as const
}

export type EntityType = {
  id: string
}

export const ComponentSchema = {
  title: 'Component Schema',
  description: 'A schema to represent some quality or property of an entity.',
  type: 'object' as const,
  properties: {
    type: {
      type: 'string' as const,
      format: 'uri' as const,
      description: 'The type of the component. Must be a URI.'
    },
    description: {
      type: 'string' as const,
      description: 'A description of the component.'
    },
    label: {
      type: 'string' as const,
      description: 'A label to display as a name for the component.'
    },
    properties: {
      type: 'object' as const,
      additionalProperties: true
    }
  },
  required: ['type'] as const
}

export type ComponentType<T = Record<string, unknown> extends Record<string, any> ? Record<string, unknown> : never> = {
  type: string
  description?: string
  label?: string
  properties?: T
}

export const RelationshipSchema = {
  title: 'Relationship Schema',
  description: 'A schema to represent a relationship between two entities.',
  type: 'object' as const,
  properties: {
    subject: {
      type: 'string' as const,
      format: 'uri' as const,
      description: 'The subject entity of the relationship. Must be a URI.'
    },
    predicate: {
      type: 'string' as const,
      description: 'The type of relationship. Can be a URI or a descriptive string.'
    },
    object: {
      type: 'string' as const,
      format: 'uri' as const,
      description: 'The object entity of the relationship. Must be a URI.'
    }
  },
  required: ['subject', 'object', 'predicate'] as const
}

export type RelationshipType = {
  subject: string
  predicate: string
  object: string
}

export const SerializedEntitySchema = {
  title: 'Serialized Entity Schema',
  description: 'An entity along with its components and relationships.',
  type: 'object' as const,
  properties: {
    id: {
      type: 'string' as const,
      format: 'uri' as const,
      description: 'A URI to the entity.'
    },
    components: {
      type: 'array' as const,
      description: 'An array of components associated with the entity.',
      items: ComponentSchema
    },
    relationships: {
      type: 'array' as const,
      description: 'An array of relationships associated with the entity.',
      items: {
        type: 'object',
        properties: {
          predicate: {
            type: 'string' as const,
            description: 'The type of relationship. Can be a URI or a descriptive string.'
          },
          object: {
            type: 'string' as const,
            format: 'uri' as const,
            description: 'A URI to the object entity.'
          }
        }
      }
    }
  },
  required: ['id', 'components', 'relationships'] as const
}

export type SerializedEntityType = {
  id: string
  components: ComponentType[]
  relationships: Array<{ predicate: string; object: string }>
}
