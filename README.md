# Schema Meta‑Ontology

Simple, universal building blocks for representing anything as data using three primitives:

- Entity — a stable identifier (URI) for “a thing”
- Component — a typed bundle of properties about an entity
- Relationship — a typed edge between two entities

This separation gives you modularity (small parts you can mix and match), composability (assemble many components/edges around the same entity), and extensibility (add new types and properties without breaking existing data). Because everything is addressed by URIs, formats are interchangeable and interoperable across systems.

## Why entities, components, relationships?

- Modularity: Each component captures a single concern (profile, address, credentials…). You can attach or remove components without touching others.
- Composability: The same entity can have many components, and many relationships, forming rich graphs from simple parts.
- Extensibility: New component types or predicates can be introduced (new URIs) without migrations. Unknown components can be preserved and forwarded by intermediaries.
- Interoperability: URIs let you reference globally-defined semantics (schema.org, DIDs, your domain), so different producers/consumers can agree on meaning without tight coupling.

### Entity

TypeScript:

```ts
type EntityType = {
  id: string // URI
}
```

JSON Schema: requires id as a string with format: uri.

Example:

```ts
import { EntityType } from '@hexafield/schema-ontology'

const alice: EntityType = {
  id: 'did:example:alice'
}
```

### Component

TypeScript (generic):

```ts
type ComponentType<T = Record<string, unknown>> = {
  type: string // URI of the component type
  description?: string // optional human-readable description
  label?: string // optional display label
  properties?: T // component-specific data (optional)
}
```

JSON Schema: includes optional description and label metadata for display; the TypeScript type mirrors these as optional fields.

Examples:

```ts
import { ComponentType } from '@hexafield/schema-ontology'

// Strongly-typed properties
type PersonProfile = {
  givenName: string
  familyName: string
}

const profileComponent: ComponentType<PersonProfile> = {
  type: 'https://schema.org/Person',
  label: 'Person Profile',
  description: 'Basic profile fields',
  properties: { givenName: 'Alice', familyName: 'Doe' }
}

// Loosely-typed (unknown structure)
const tagsComponent: ComponentType = {
  type: 'urn:example:component:tags',
  properties: { tags: ['friend', 'colleague'] }
}

// Component without properties (marker/flag-style)
const verifiedMarker: ComponentType = {
  type: 'urn:example:component:verified',
  label: 'Verified Account',
  description: 'Indicates the account has been verified'
}
```

### Relationship

TypeScript:

```ts
type RelationshipType = {
  source: string // URI of source entity
  target: string // URI of target entity
  predicate: string // URI (recommended) or descriptive string
}
```

Examples:

```ts
import { RelationshipType } from '@hexafield/schema-ontology'

const knows: RelationshipType = {
  source: 'did:example:alice',
  target: 'did:example:bob',
  predicate: 'https://schema.org/knows'
}

const enrolledIn: RelationshipType = {
  source: 'https://example.com/users/42',
  target: 'https://example.edu/courses/intro-to-graphs',
  predicate: 'urn:example:predicate:enrolledIn'
}
```

### Serialized entity

When you want to package an entity together with its components and relationships, use the `SerializedEntitySchema` for runtime validation.

Shape (JSON Schema-driven):

- id: string (URI) — required
- components: Component[] — array of `ComponentSchema` items
- relationships: Array<{ target: string; predicate: string }>
  - Note: `source` is omitted here and implicitly equals the entity’s `id`.

Example:

```ts
import { SerializedEntityType } from '@hexafield/schema-ontology'

const alice: SerializedEntityType = {
  id: 'did:example:alice',
  components: [
    {
      type: 'https://schema.org/Person',
      label: 'Person Profile',
      properties: { givenName: 'Alice', familyName: 'Doe' }
    }
  ],
  relationships: [{ target: 'did:example:bob', predicate: 'https://schema.org/knows' }]
}
```

## License

MIT
