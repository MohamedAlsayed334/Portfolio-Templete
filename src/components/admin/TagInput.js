'use client'

import { useState } from 'react'

export default function TagInput({ tags = [], onChange, placeholder = 'Type and press Enter' }) {
  const [input, setInput] = useState('')

  function addTag(e) {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault()
      onChange([...tags, input.trim()])
      setInput('')
    }
  }

  function removeTag(index) {
    onChange(tags.filter((_, i) => i !== index))
  }

  return (
    <div className="tagInput">
      {tags.map((tag, i) => (
        <span key={i} className="tag">
          {tag}
          <span className="tagRemove" onClick={() => removeTag(i)}>&times;</span>
        </span>
      ))}
      <input
        className="tagInputField"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={addTag}
        placeholder={tags.length === 0 ? placeholder : ''}
      />
    </div>
  )
}
