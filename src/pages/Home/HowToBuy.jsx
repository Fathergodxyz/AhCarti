import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import PropTypes from "prop-types";

const HowToBuy = () => {
  const wrapper = useRef();

  useGSAP(
    () => {
      const items = wrapper.current.querySelectorAll(".slide-in-item");

      gsap.fromTo(
        items,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.3,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: wrapper.current,
            start: "25% bottom",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { dependencies: [], revertOnUpdate: true }
  );

  return (
    <div ref={wrapper} className="bg-[#BDCAD250] section-wrapper">
      <div className="flex flex-col items-center max-w-[1440px] w-[90%] sm:w-[93%]">
        <div className="text-center">
          <h2 className="uppercase text-[48px] xs:text-[56px] md:text-[64px] lg:text-[72px] xl:text-[80px] 2xl:text-[97px] text-maroon !leading-none slide-in-item">
            how To Buy
          </h2>

          <p className="font-madimi text-2xl md:text-[28px] lg:text-[32px] xl:text-[36px] 2xl:text-[50px] text-maroon max-w-[18.1em] !leading-[1.25] mt-3 slide-in-item">
            Follow these easy steps to become a Father holder.
          </p>
        </div>

        <div className="flex items-center xl:items-end gap-12 2xl:gap-20 mt-8 md:mt-10 xl:mt-0 2xl:-mt-14">
          <div className="grid xs:grid-cols-2 gap-4 xl:gap-6 2xl:gap-7 xl:mb-10 2xl:mb-20">
            <Card>
              <span>1.</span>

              <p>
                Journey to the realm of{" "}
                <a
                  href="https://phantom.app"
                  target="_blank"
                  className="text-maroon underline"
                >
                  phantom.app
                </a>{" "}
                and follow the simple rites to forge your account using the
                Phantom app or browser spell—err, extension.
              </p>
            </Card>

            <Card>
              <span>2.</span>

              <p>
                Once equipped, tap the BUY sigil within the app to summon Solana
                ($SOL) or transfer $SOL into your Phantom wallet from your
                chosen exchange of coin.
              </p>
            </Card>

            <Card>
              <span className="text-maroon">3.</span>

              <div className="space-y-[0.5em] xl:space-y-[1em]">
                <p className="text-maroon">Barter $SOL for $FATHER</p>

                <p>
                  Tap the SWAP icon within your Phantom wallet and paste the
                  $FATHER token address. Trade your $SOL for the legendary
                  $FATHER token.
                </p>
              </div>
            </Card>

            <Card>
              <span>4.</span>

              <p>
                Huzzah! Thou art now a $FATHER holder! <br /> Welcome, noble
                one, to the quest of $FATHER’s mission!
              </p>
            </Card>
          </div>

          <img
            src="/teaching-how-to-buy.png"
            alt="teaching how to buy"
            width={483}
            height={871}
            className="hidden lg:block w-1/3 max-w-[300px] xl:max-w-[400px] 2xl:max-w-[483px] slide-in-item"
          />
        </div>
      </div>
    </div>
  );
};

export default HowToBuy;

const Card = ({ children }) => {
  return (
    <div className="border-4 border-maroon bg-white text-lg sm:text-xl md:text-[22px] xl:text-[25px] !leading-[1.3] font-madimi px-4 xl:px-5 py-4 md:py-5 2xl:py-8 flex gap-3 slide-in-item">
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
};
