import React from 'react'
import { useRedirectOnCondition } from '../hooks/useRedirectOnCondition';
import { useFilteredProducts } from '../context/FilteredProductsContext';

function Faq() {
    const {filteredProducts , setFilteredProducts} = useFilteredProducts();
    useRedirectOnCondition(filteredProducts.length > 0, '/');
  console.log('filteredProducts in faq :>> ', filteredProducts);

  return (
    
    <div className='faq-main-container'>
            {/* FAQ section */}
            <h2>Frequently asked questions</h2>
            <ul>
             
                <>
                  <li>
                    <h3>Custom and personalised orders and returns</h3>
                    <p>
                      I love our little collaborations! Don&apos;t hesitate to
                      contact me with your ideas. But please please please try
                      to avoid requesting mass market replicas or copies of
                      someone else&apos;s work! Since the standard worldwide
                      delivery is free, if you want to return your item, that is
                      not damaged, you are the one to cover the shipping. I
                      don&apos;t offer covering shipping expenses in this case.
                      I recommend choosing the most simple option available in
                      your country, no tracking and insurance need (for Germany
                      BUEWA or 1 euro letter works best). For damaged item
                      please see the info below.
                    </p>
                  </li>

                  <li>
                    <h3>Are the stones you use real?</h3>
                    <p>
                      Yes! Most of them are natural, otherwise it says so. For
                      example some of the beads can be synthetically produced
                      stones. But all of them are unique, cold to touch and
                      pretty (I make sure of that). All the stones have their
                      character too, most of the colors are not homogenous. E.g.
                      it&apos;s normal for lapis lazuli to have white parts -
                      it&apos;s calcit working it&apos;s magic in the mineral.
                      Apatite can also have white and/or brown spots and so on.
                      All of these are signs of their natural origin and
                      uniqueness, not flaws. The crystals in my anti-anxiety
                      faceted gem rings are always natural.
                    </p>
                  </li>

                  <li>
                    <h3>Why do you call your jewelry anti-anxiety?</h3>
                    <p>
                      All of it is perfect for fidgeting, especially the rings
                      and bracelets. I found that playing with the stone beads
                      helps me to concentrate and relax, especially in stressful
                      situations. I love how gems are changing their
                      temperature, how they clack, how the light breaks in them,
                      how unique each one of them looks. I choose natural
                      gemstones known by their anti-anxiety properties: like
                      amethyst, rose quartz, aventurine etc. I believe that
                      everything coming from nature has a little bit of magic in
                      it and is able so store vibes and energy.
                    </p>
                  </li>

                  <li>
                    <h3>Sizing details</h3>
                    <p>
                      The best way to measure your fingers for the rings is to
                      use piece of thread. Wrap it around your finger and then
                      measure where the ends meet. This method can be used for
                      bracelets and necklaces too. I can always help you with
                      sizing. Please don&apos;t forget to consult the
                      description of an item for it&apos;s size.
                    </p>
                  </li>
                  <li>
                    <h3>I haven&apos;t received my order</h3>
                    <p>
                      Sorry you have to wait so long! Please do get in touch
                      with me and we will figure something out. Don&apos;t
                      forget to check the average delivery time for your
                      location in shop info.
                    </p>
                  </li>
                  <li>
                    <h3>My order came in broken</h3>
                    <p>
                      Oh no! Please contact me for replacement. I pack
                      everything as securely as possible in bubble wrap (I
                      mostly re-use it to avoid new plastic), but sometimes
                      stones can break during shipping. Don&apos;t hesitate to
                      reach out! If the item was broken within a month after the
                      purchase I can also offer a free replacement. Please
                      kindly describe what has happened to it and include
                      pictures. No need to send the item back.
                    </p>
                  </li>
                  <li>
                    <h3>Care instructions - Stones</h3>
                    <p>
                      Here are some care instructions. All the pieces are sturdy
                      and securely made and with right care they can last so
                      long! - Please avoid hitting stones against hard surfaces,
                      some gems can be brittle and chip, this can affect
                      durability and comfort. - You can get the pieces wet, but
                      please avoid chemicals and frequent exposure to soaps,
                      especially when there&apos;s a metal element present.
                      Silver will tarnish in time, but can easily be cleaned. -
                      Please avoid heat and open fire. It&apos;s better to take
                      the jewelry off when cooking.
                    </p>
                  </li>
                  <li>
                    <h3>Care Instructions - Elastics</h3>
                    <p>
                      Elastic thread that I use is a tiny miracle. It&apos;s so
                      comfy to wear and easy to work with - but as with any
                      elastics with really active wear it can stretch out. But
                      no worries, it&apos;s really easy to avoid this. - Please
                      avoid unnecessary stretching - the pieces are meant to be
                      played with but excessive pulling will thin the tread out.
                      - Make sure you choose the right size of the piece. If it
                      fits right, it&apos;s less likely to stretch. - It&apos;s
                      helpful to leave your jewelry to lay around for couple
                      days, so the thread can relieve the stress and come back
                      to it&apos;s normal state (works for me too haha). Let the
                      physics do its work.
                    </p>

                    <p>
                      And a general tip - make sure not to put the pieces in the
                      washing machine... I know, happens to the best of us...
                    </p>
                  </li>
                  <li>
                    <h3>Important! Children Safety 👼</h3>
                    <p>
                      The jewellery is designed for adults. However I can make
                      any design in children&apos;s sizes. The parent/buyer then
                      is the one to decide whether the jewellery is suitable and
                      appropriate for the child. The shop doesn&apos;t carry any
                      responsibility in case when the jewellery is damaged
                      or/and afflicts any injury while in use by a child. Please
                      be aware of small parts and/or breakable parts. Please use
                      common sense and use only as intended.
                    </p>
                  </li>
                  <li>
                    <h3>Important! Metal Allergy!</h3>
                    <p>
                      The crimp beads I use in almost all the jewelry are made
                      of safe non-ferrous non-precious metal. They are totally
                      fine for everyday wear as well for contact with water
                      (some of my bracelets I have worn for years now). However,
                      if you have a metal allergy (develop a rush or skin
                      colouring while in contact with non-precious metals) you
                      can ask me to replace the crimping bead to hippoallergenic
                      sterling silver one. Just drop me a message if you are
                      unsure!
                    </p>
                  </li>

                  {/* ... Render other limited FAQ items ... */}

                  
                </>
              
            </ul>
          </div>
  )
}

export default Faq


