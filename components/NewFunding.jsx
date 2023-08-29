import React, { useRef } from 'react'

const NewFunding = () => {

    const titleRef = useRef()
    const descRef = useRef()
    const goalRef = useRef()
    const imageRef = useRef()


    const handleFormSubmit = (e) => {
        e.preventDefault()

        const title = titleRef.current.value
        const description = descRef.current.value
        const goal = goalRef.current.value
        const image = imageRef.current.value

    }

  return (
    <form onSubmit={handleFormSubmit}>
        <label htmlFor="">Title</label>
        <input type="text" ref={titleRef}/>
        <label htmlFor="">Description</label>
        <input type="text" ref={descRef}/>
        <label htmlFor="">Goal</label>
        <input type="text" ref={goalRef}/>
        <label htmlFor="">Image</label>
        <input type="text" ref={imageRef} />
        <button>Submit</button>
    </form>
  )
}

export default NewFunding