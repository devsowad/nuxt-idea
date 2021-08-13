import actionsModule from './idea/actions'
import mutationsModule from './idea/mutations'

export const state = () => ({
  ideas: {},
  idea: {},
  categories: [],
  editIdea: {},
})

export const actions = actionsModule
export const mutations = mutationsModule
