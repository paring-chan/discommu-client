import { connect } from "react-redux"
import { updateSession } from "../actions/user"

const mapStateToProps = state => ({
    session: state.session
})

const mapDispatchToProps = dispatch => ({
    updateSession: (user) => dispatch(updateSession(user))
})

export const connectToReducer = (component) => connect(mapStateToProps, mapDispatchToProps)(component)