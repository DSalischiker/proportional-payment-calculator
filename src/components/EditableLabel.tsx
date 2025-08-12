import { useState, useRef, useEffect } from 'react'
import { Pencil } from 'lucide-react'

interface EditableLabelProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  className?: string
}

export default function EditableLabel({ value, onChange, placeholder, className = '' }: EditableLabelProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  // Update editValue when value prop changes
  useEffect(() => {
    if (!isEditing) {
      setEditValue(value)
    }
  }, [value, isEditing])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleSubmit = () => {
    const newValue = editValue.trim() || placeholder
    console.log('EditableLabel submitting:', editValue, '-> newValue:', newValue)
    onChange(newValue)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    } else if (e.key === 'Escape') {
      setEditValue(value)
      setIsEditing(false)
    }
  }

  const handleBlur = () => {
    handleSubmit()
  }

  const handleClick = () => {
    console.log('EditableLabel clicked, current value:', value)
    setEditValue(value)
    setIsEditing(true)
  }

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className={`bg-transparent border-none outline-none font-medium text-sm px-0 py-1 ${className}`}
        style={{ width: `${Math.max(editValue.length, placeholder.length)}ch` }}
      />
    )
  }

  return (
    <p
      onClick={handleClick}
      className={`cursor-pointer hover:bg-muted/70 px-2 py-0 rounded transition-all font-medium text-sm text-primary border-b-1 border-dashed group ${className}`}
      title="Haz clic para editar"
    >
      {value}
      <Pencil className="size-3 ml-2 hidden group-hover:inline-block transition-opacity duration-200" />
    </p>
  )
}
