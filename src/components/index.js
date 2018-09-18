import {connect} from 'react-redux'
import HomeView from './home'
import Step1 from '../step/step1.js'
import Step2 from '../step/step2.js'

const mapStateToProps = (state) => ({
    Step1,
    Step2
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)