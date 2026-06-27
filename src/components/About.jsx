import { members } from '../data/members'
import './About.css'

const BIO = `Spark of Sanity is a rock band from Aalst, Netherlands. We play a mix of original songs and covers from bands we love — Kaleo, Highly Suspect, Arctic Monkeys and many others. Our sound spans everything from slow burners to high-energy rock, with a focus on honest songs and loud guitars.`

export default function About() {
  return (
    <div className="section-wrapper section-wrapper--alt">
      <section id="about">
        <h2 className="section-heading">About</h2>
        <p className="about__bio">{BIO}</p>
        <div className="about__members">
          {members.map(member => (
            <div key={member.id} className="about__member">
              <div className="about__photo">
                <img src={member.photo} alt={member.name} />
              </div>
              <h3 className="about__name">{member.name}</h3>
              <p className="about__instrument">{member.instrument}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
