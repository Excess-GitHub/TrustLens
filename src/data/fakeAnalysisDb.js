// FILE: src/data/fakeAnalysisDb.js

const SMEARING_IMG = new URL('../Resources/Smearing.jpg', import.meta.url).href;

export const FLAG_DEFS = {
  fingers: {
    id: 'fingers',
    name: 'Fingers',
    icon: '🖐',
    description: 'Extra or malformed fingers are a common artifact in AI-generated images.',
    howToDetect: [
      'Zoom in on hands and count the fingers on each hand.',
      'Look for fingers that merge together or have strange proportions.'
    ],
    details: [
      {
        cropImage: '/Resources/camera.png',
        text: 'In this example, the hand appears to have six fingers, which rarely happens in real photos.'
      },
      {
        cropImage: '/Resources/Details.png',
        text: 'Finger joints are melted and ring edges blend into the skin, typical of generative models.'
      }
    ]
  },
  eyes: {
    id: 'eyes',
    name: 'Eyes',
    icon: '👀',
    description: 'AI images often produce asymmetric or glassy-looking eyes.',
    howToDetect: [
      'Check if both eyes point in the same direction.',
      'Look for mismatched reflections or shapes.'
    ],
    details: [
      {
        cropImage: '/flags/eyes_example1.png',
        text: 'Notice how the left eye appears to look in a different direction than the right eye.'
      },
      {
        cropImage: '/flags/eyes_example2.png',
        text: 'The eyes have an unnatural glassy appearance with inconsistent reflections.'
      }
    ]
  },
  hair: {
    id: 'hair',
    name: 'Hair',
    icon: '💇',
    description: 'Hair in AI images can look smeared, overly smooth, or tangled in unnatural ways.',
    howToDetect: [
      'Look for blurry hair strands or hair blending into the background.',
      'Check if individual hair strands are visible or if they appear as a solid mass.'
    ],
    details: [
      {
        cropImage: '/flags/hair_example1.png',
        text: 'Hair strands appear smeared and blend unnaturally into the background.'
      }
    ]
  },
  smearing: {
    id: 'smearing',
    name: 'Smearing',
    icon: '✨',
    description: 'Background and edges may smear or melt together.',
    howToDetect: [
      'Look for objects that fade into each other or have smeared edges.',
      'Check if boundaries between objects are clearly defined or blurred.'
    ],
    details: [
      {
        cropImage: SMEARING_IMG,
        text: 'The background smears into the subject, suggesting generative artifacts.'
      }
    ]
  },
  lighting: {
    id: 'lighting',
    name: 'Lighting',
    icon: '💡',
    description: 'Inconsistent or unnatural lighting patterns can indicate AI generation.',
    howToDetect: [
      'Check if shadows are consistent with the light source.',
      'Look for multiple conflicting light sources or shadows pointing in different directions.'
    ]
  },
  text: {
    id: 'text',
    name: 'Text Artifacts',
    icon: '📝',
    description: 'AI models often struggle with rendering text clearly.',
    howToDetect: [
      'Look for garbled, distorted, or nonsensical text in images.',
      'Check if letters are merged or have unusual shapes.'
    ]
  }
};

export const FAKE_ANALYSIS_DB = {
  'sample_hands_image': {
    verdict: 'AI',
    shortExplanation: 'Hands and fingers show typical AI artifacts.',
    flags: ['fingers', 'smearing'],
    details: [
      { cropImage: '/Resources/camera.png', text: 'This hand appears to have six fingers, a classic AI tell.' },
      { cropImage: '/Resources/Fail.png', text: 'The background smears into the fingers, suggesting generative artifacts.' }
    ]
  },
  'sample_real_photo': {
    verdict: 'REAL',
    shortExplanation: 'Natural lighting and consistent anatomy suggest a real photo.',
    flags: [],
    details: []
  },
  'ai_portrait_001': {
    verdict: 'AI',
    shortExplanation: 'Multiple AI flags detected including eyes and hair artifacts.',
    flags: ['eyes', 'hair'],
    details: [
      { cropImage: '/crops/portrait/eyes.png', text: 'Asymmetric eye alignment indicates AI generation.' },
      { cropImage: '/crops/portrait/hair.png', text: 'Hair appears unnaturally smooth and smeared.' }
    ]
  },
  'real_landscape_001': {
    verdict: 'REAL',
    shortExplanation: 'Natural textures and consistent lighting patterns suggest authenticity.',
    flags: [],
    details: []
  }
};

