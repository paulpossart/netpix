# ARIA Attribute Cheat Sheet
## Accessible Labels
| Attribute              | Use                                                        |
|------------------------|------------------------------------------------------------|
| `aria-label="..."`     | Gives an invisible label to an element (used by screen readers) |
| `aria-labelledby="id"` | References another element’s ID to use its content as the label |


```
<button aria-label="Close menu">❌</button>
<h2 id="form-title">Sign In</h2>
<form aria-labelledby="form-title">
```

 ## Descriptive Text
| Attribute              | Use                                                        |
|------------------------|------------------------------------------------------------|
| `aria-describedby="id"`| Connects to helpful extra text, like instructions or hints |

```
<p id="email-help">We'll never share your email.</p>
<input type="email" aria-describedby="email-help" />
```

## State Indicators
| Attribute              | Use                                  |
|------------------------|------------------------------------|
| `aria-expanded="true"` | For dropdowns, accordions, etc.     |
| `aria-controls="id"`   | Links a control to what it controls |
| `aria-pressed="true"`  | For toggle buttons                  |
| `aria-selected="true"` | Marks selected item in tabs or lists |
| `aria-hidden="true"`   | Hides from screen readers (not visually) |
| `aria-disabled="true"` | Marks a non-native element as disabled |


```
<button
  aria-expanded={isOpen}
  aria-controls="menu"
  onClick={() => setIsOpen(!isOpen)}
>
  Toggle Menu
</button>
<div id="menu" hidden={!isOpen}>...</div>
```

## Eror Handling
| Attribute                | Use                                  |
|--------------------------|------------------------------------|
| `aria-errormessage="id"` | Points to a dedicated error message element |
| `aria-invalid="true"`    | Marks the input as invalid           |

```
<input
  id="username"
  aria-errormessage="username-error"
  aria-invalid={!!errorMsg}
/>
<p id="username-error" role="alert">{errorMsg}</p>
```

## Live Region Updates
| Attribute            | Use                                    |
|----------------------|----------------------------------------|
| `aria-live="polite"` | Announces updates when idle             |
| `aria-live="assertive"` | Announces immediately (e.g., errors) |
| `role="alert"`       | Same as `aria-live="assertive"`        |


```
<p aria-live="assertive">{statusMsg}</p>
```

## "Visually Hidden" Class
```
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
```