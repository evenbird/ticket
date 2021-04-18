// import axios from 'axios'
import buldClient from '../api/build-client'

const LandingPage = ({ currentuser }) => {
    console.log(currentuser);
    return <h1>Landing Page</h1>
}

LandingPage.getInitialProps = async (context) => {
    const { data } = await buldClient(context).get('/api/users/currentuser')
    return data
}

export default LandingPage;