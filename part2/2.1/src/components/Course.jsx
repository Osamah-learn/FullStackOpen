import React from 'react'

export default function Course({course}) {
   
    
    return (
        <div>
            <h1>{course.name}</h1>
           {course.parts.map(item => <p key={item.name}>{item.name}: {item.exercises}</p>)}
          
        </div>
    )
}
