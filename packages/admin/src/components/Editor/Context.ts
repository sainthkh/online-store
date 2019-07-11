import React from 'react'
import { Action } from './reducer'

const Context = React.createContext<React.Dispatch<Action>>(null!)

export default Context
