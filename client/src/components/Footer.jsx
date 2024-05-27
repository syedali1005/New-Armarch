import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram,  BsLinkedin } from "react-icons/bs";
export default function FooterCom() {
  return (
      <Footer container className="border border-t-8 border-yellow-500">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid w-full justify-between sm:flex md:grid-cols-1">
            <div className="mt-5 text-center sm:text-left">
              <Link
                to="/"
                className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
              >
                <img src="/01.png" alt="Armarch Logo" className="h-48 mx-auto sm:mx-0" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-8 ml-10 sm:grid-cols-3 sm:gap-6 justify-center sm:justify-start sm:mt-0">
              <div>
                <Footer.Title title="About" />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="/projects"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Projects
                  </Footer.Link>
                  <Footer.Link
                    href="/about"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Armarch
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Follow us" />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="https://www.facebook.com/armarchengineering"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </Footer.Link>
                  <Footer.Link href="https://www.instagram.com/arm_arch_engineering/">Instagram</Footer.Link>
                  <Footer.Link href="https://www.linkedin.com/company/armarch">LinkedIn</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Legal" />
                <Footer.LinkGroup col>
                  <Footer.Link href="#">Privacy Policy</Footer.Link>
                  <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
          <Footer.Divider />
          <div className="flex justify-center sm:justify-start gap-6 sm:mt-0 mt-4">
          <Footer.Copyright
              href="#"
              by="Armarch"
              year={new Date().getFullYear()}
            />
            <div className="flex justify-center sm:justify-start gap-6 sm:mt-0">
            <Footer.Icon href="https://www.facebook.com/armarchengineering" icon={BsFacebook} />
            <Footer.Icon href="https://www.instagram.com/arm_arch_engineering/" icon={BsInstagram} />
            <Footer.Icon href="https://www.linkedin.com/company/armarch" icon={BsLinkedin} />
          </div>          
          </div>
        </div>
      </Footer>
    );
  }