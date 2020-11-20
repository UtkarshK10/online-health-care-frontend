import React from 'react'
import Particle from '../Particles'
import Forget from './Forget'

export const TempParticle = ({ match }) => {
    return (
        <div className="page">
            <Particle />
            <Forget token={match.params.token} />
        </div>
    )
}
