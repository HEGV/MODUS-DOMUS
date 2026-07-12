const galleryTranslations={
  hr:{back:"← Povratak na početnu",kicker:"ODABRANI RADOVI",title:"Galerija namještaja po mjeri",intro:"Odaberite kategoriju. Fotografije su prikazane bez rastezanja i nepotrebnog rezanja.",filterAll:"Svi radovi",filterRooms:"Sobe i ormari",filterKitchens:"Kuhinje",filterLiving:"Dnevni prostori",rooms:"Sobe i ormari po mjeri",kitchens:"Kuhinje po mjeri",living:"Moderni dnevni prostori",ctaTitle:"Imate ideju za svoj prostor?",cta:"Kontaktirajte nas →"},
  en:{back:"← Back to home",kicker:"SELECTED WORK",title:"Custom furniture gallery",intro:"Choose a category. Photos are shown without stretching or unnecessary cropping.",filterAll:"All projects",filterRooms:"Bedrooms and wardrobes",filterKitchens:"Kitchens",filterLiving:"Living spaces",rooms:"Bedrooms and custom wardrobes",kitchens:"Custom kitchens",living:"Modern living spaces",ctaTitle:"Do you have an idea for your space?",cta:"Contact us →"},
  de:{back:"← Zurück zur Startseite",kicker:"AUSGEWÄHLTE ARBEITEN",title:"Galerie für Möbel nach Maß",intro:"Wählen Sie eine Kategorie. Die Fotos werden ohne Verzerrung oder unnötigen Beschnitt gezeigt.",filterAll:"Alle Arbeiten",filterRooms:"Schlafzimmer und Schränke",filterKitchens:"Küchen",filterLiving:"Wohnbereiche",rooms:"Schlafzimmer und Einbauschränke",kitchens:"Küchen nach Maß",living:"Moderne Wohnbereiche",ctaTitle:"Sie haben eine Idee für Ihren Raum?",cta:"Kontaktieren Sie uns →"}
};
const langButtons=document.querySelectorAll(".gallery-lang");
function setGalleryLanguage(lang){
  document.documentElement.lang=lang;
  document.querySelectorAll("[data-g18n]").forEach(el=>{
    const key=el.dataset.g18n;
    if(galleryTranslations[lang][key])el.textContent=galleryTranslations[lang][key];
  });
  langButtons.forEach(btn=>btn.classList.toggle("active",btn.dataset.lang===lang));
  localStorage.setItem("modusDomusLanguage",lang);
}
langButtons.forEach(btn=>btn.addEventListener("click",()=>setGalleryLanguage(btn.dataset.lang)));
setGalleryLanguage(localStorage.getItem("modusDomusLanguage")||"hr");

const lightbox=document.getElementById("galleryLightbox");
const lightboxImg=lightbox.querySelector("img");
const closeButton=lightbox.querySelector(".gallery-lightbox-close");
function closeLightbox(){
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden","true");
  lightboxImg.src="";
  document.body.style.overflow="";
}
document.querySelectorAll("[data-full]").forEach(button=>{
  button.addEventListener("click",()=>{
    lightboxImg.src=button.dataset.full;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden","false");
    document.body.style.overflow="hidden";
  });
});
closeButton.addEventListener("click",closeLightbox);
lightbox.addEventListener("click",event=>{if(event.target===lightbox)closeLightbox();});
document.addEventListener("keydown",event=>{if(event.key==="Escape")closeLightbox();});


const gallerySections=document.querySelectorAll(".gallery-section[data-category]");
const filterButtons=document.querySelectorAll(".gallery-filter-button");

function currentGalleryFilter(){
  const value=window.location.hash.replace("#","");
  return ["sobe","kuhinje","dnevni"].includes(value)?value:"all";
}

function applyGalleryFilter(filter){
  gallerySections.forEach(section=>{
    section.classList.toggle("is-hidden",filter!=="all"&&section.dataset.category!==filter);
  });
  filterButtons.forEach(button=>{
    button.classList.toggle("active",button.dataset.filter===filter);
  });
}

filterButtons.forEach(button=>{
  button.addEventListener("click",()=>{
    const filter=button.dataset.filter;
    if(filter==="all"){
      history.replaceState(null,"",window.location.pathname+window.location.search);
      applyGalleryFilter("all");
    }else{
      window.location.hash=filter;
      applyGalleryFilter(filter);
    }
    window.scrollTo({top:0,behavior:"smooth"});
  });
});

window.addEventListener("hashchange",()=>applyGalleryFilter(currentGalleryFilter()));
applyGalleryFilter(currentGalleryFilter());
