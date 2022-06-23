import { ImYoutube2, ImFacebook2 } from 'react-icons/im'
import Styles from './Footer.module.scss'
import Logo from '@/public/logo_white.svg'
import Image from 'next/image'
const Footer = (): JSX.Element => {
  return (
    <div className={Styles.Footer}>
      <div className={Styles.topFooter}>
        <div className={Styles.infoAddress}>
          <ul>
            <p className={Styles.colName}>
              <Image src={Logo} alt="Logo " />
            </p>
            <li>Phone number: 0963639201</li>
            <li>Email: contact@learningcode.io</li>
            <li>Address: KP6 - Linh Trung - Thu Duc - Ho Chi Minh City</li>
          </ul>
        </div>
        <div className={Styles.infoAbout}>
          <ul>
            <p className={Styles.colName}>About</p>
            <li>Introduce</li>
            <li>Job Opportunities</li>
            <li>Partner</li>
          </ul>
        </div>
        <div className={Styles.infoSupport}>
          <ul>
            <p className={Styles.colName}>Support</p>
            <li>Contact</li>
            <li>Security</li>
            <li>Rules</li>
          </ul>
        </div>
        <div className={Styles.infoCompany}>
          <ul>
            <p className={Styles.colName}>Company</p>
            <li>Tax: 1122405200215</li>
            <li>Establish date: 05/05/2022</li>
            <li>Technology, education, programming. LeaningCode.io builds and develops network products that add value to the community.</li>
          </ul>
        </div>
      </div>
      <div className={Styles.bottomFooter}>
        <div className={Styles.copyRight}>© 2022 - 2026 LNC. All rights reserved.</div>
        <div className={Styles.socialMedia}>
          <ImYoutube2 />

          <ImFacebook2 />
        </div>
      </div>
    </div>
  )
}

export default Footer
