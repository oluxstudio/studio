<template>
  <div class="bg-zinc-500">
    <div class="flex fixed top-0 text-zinc-200 z-10">
      <div id="Logo">Olux studio</div>
      <div id="MenuBar">=</div>
      <div id="MenuBar">
        <div><a href="#HomePage">home</a></div>
        <div><a href="#AboutMe">about us</a></div>
        <div><a href="#Services">services</a></div>
        <div>contact</div>
      </div>
    </div>
    <div id="HomePage" class="h-screen"> 


      <div class=" container relative mx-auto h-full px-4 z-20 text-zinc-200 ">
        <div class="flex h-full justify-between">
          <div class="flex flex-col justify-center">
            <div class="items-center"> 
              <h4>title</h4>
              <h2>Intro message</h2>
              <h4>description</h4>
              <button>Say Hello</button>
            </div>
            <div class="absolute bottom-2"> contact data</div>
          </div>
          <div>
            <div > 
              <div>contact data</div>
              <img src="http://localhost/0u6tWKocdAkDr8en3bDoaDYb86m2PSl86GpwPKZf.jpg"/>
            </div>
          </div>
        </div>        
      </div>
      
      <div class="absolute top-0 z-0 h-full w-full">
        <video autoplay muted loop id="myVideo">
          <source src="~/assets/videos/3129540-uhd_3840_2160_30fps.mp4" type="video/mp4">
        </video>
      </div>
      
    </div>

    <div class="pages container mx-auto px-4">
      <div id="AboutMe" class="h-screen">
        <div class="flex">
          <div id="slideshow"></div>
          <div id="Desc">What I do</div>
          <div id="Desc">{{  aboutpage?.entities.provident_doloribus.nodes.email.attr.id.value }}</div>
          <ul id="Desc">
            <li v-for="(item, key, index) in aboutpage?.entities.provident_doloribus.nodes.subject.list">
              <div>{{ item }} key:{{ key }}</div>
            </li>
          </ul>
        </div>
      </div>

      <div id="Services" class="h-screen">
        <div class="flex">
          <div id="slideshow"></div>
          <div id="Desc">our services</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

  const {siteTreeObj,formatSiteTreeObj}= useSiteObj()
  formatSiteTreeObj('01j4f6ptt3q1r7e0pcpc61se95')
  const homepage = siteTreeObj.value?.pages.find((item:any)=>item.name==='home')

  const aboutpage = siteTreeObj.value?.pages.find((item:any)=>item.name==='about_us')
  
  const servicespage = siteTreeObj.value?.pages.find((item:any)=>item.name==='services')
  // console.log('eer', {homepage,servicespage});
  
</script>
<style>
  #HomePage{
    overflow: hidden;
  }
  #myVideo {
    position: relative;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    object-fit: cover;
  }
  .pages{
    background: #f55;
    position: relative;
  }
</style>