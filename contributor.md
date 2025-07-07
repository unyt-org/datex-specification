---
layout: page
title: Our Team
sidebar: false
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme'

const coreMembers = [
  {
    avatar: 'https://www.github.com/jonasstrehle.png',
    name: 'Jonas Strehle',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/jonasstrehle' },
      { icon: 'twitter', link: 'https://twitter.com/jonasstrehle' }
    ]
  },
  {
    avatar: 'https://www.github.com/benStre.png',
    name: 'Benedikt Strehle',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/benStre' },
	  { icon: 'twitter', link: 'https://twitter.com/benStre' }
    ]
  },
  {
    avatar: 'https://www.github.com/asbng.png',
    name: 'Adrian Siebing',
    title: 'Deputy Head',
    links: [
      { icon: 'github', link: 'https://github.com/asbng' }
    ]
  },
  {
    avatar: 'https://www.github.com/KoehlerT.png',
    name: 'Tim Köhler',
    title: 'Co-Founder',
    links: [
      { icon: 'github', link: 'https://github.com/KoehlerT' }
    ]
  },
  {
    avatar: 'https://www.github.com/HuskyRight.png',
    name: 'Marvin Klein',
    title: 'Intern',
    links: [
      { icon: 'github', link: 'https://github.com/HuskyRight' }
    ]
  },
  {
    avatar: 'https://www.github.com/TeeB3utel.png',
    name: 'Nico Brenner',
    title: 'Security Expert',
    links: [
      { icon: 'github', link: 'https://github.com/TeeB3utel' }
    ]
  }
]

// const partners = [
//   {
//     avatar: 'https://example.com/avatar3.png',
//     name: 'Partner One',
//     title: 'Community Partner',
//     links: [
//       { icon: 'twitter', link: 'https://twitter.com/partnerone' }
//     ]
//   }
// ]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      Our Team
    </template>
    <template #lead>
      The development of this project is guided by an awesome international team.
    </template>
  </VPTeamPageTitle>

  <VPTeamMembers size="medium" :members="coreMembers" />

  <!-- <VPTeamPageSection>
    <template #title>Contributors</template>
    <template #lead>Our valued community contributors.</template>
    <template #members>
      <VPTeamMembers size="small" :members="partners" />
    </template>
  </VPTeamPageSection> -->
</VPTeamPage>
