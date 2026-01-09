/**
 * Valentine's Day Website Configuration
 * Edit this file to customize your website
 */

const CONFIG = {
    // Personal Information
    names: {
        yourName: "Bibi",
        partnerName: "Najwan",
        signature: "Bibi ❤️"
    },
    
    // Hero Section
    hero: {
        title: "Will You Be My Valentine? Najwan Adams.",
        subtitle: "Every day with you is a beautiful adventure",
        yesMessage: "You Said Yes! ❤️",
        noMessages: [
            "Are you sure?",
            "Think again!",
            "Give it another thought!",
            "Don't break my heart!",
            "I'll keep asking!",
            "Last chance to change your mind!",
            "Please? 🥺",
            "You know you want to!",
            "My heart is breaking...",
            "Okay, this is getting awkward...LOVE ME!"
        ]
    },
    
    // Music Configuration
    music: {
        enabled: true,
        sources: [
            {
                url: "asserts/music/Davido - Jowo.flac",
                title: "Love Theme",
                artist: "Romantic Music"
            }
        ],
        volume: 0.5
    },
    
    // Memories/Slideshow
    memories: [
        {
            image: "asserts/images/najwan1.jpg.jpeg",
            title: "",
            date: "",
            description: ""
        },
        {
            image: "asserts/images/najwan2.jpg.jpeg",
            title: "",
            date: "",
            description: ""
        },
        {
            image: " asserts/images/najwan3.jpg.jpeg",
            title: "",
            date: "",
            description: ""
        },
        {
            image: "asserts/images/najwan4.jpg.jpeg",
            title: "",
            date: "",
            description: ""
        },
       
    ],
    
    // Video Configuration
    video: {
        sources: [
            {
                url: "asserts/vidoes/Najwan Adams 1.mp4",
                
                type: "video/mp4",
                caption: "My love for you grows every day"
            }
            
        ],
        captions: [
            "Every moment with you is special",
            "My heart beats only for you",
            "Forever and always"
        ]
    },
    
    // Quotes for Final Message
    quotes: [
        "I love you not only for what you are, but for what I am when I am with you.",
        "You are the source of my joy, the center of my world, and the whole of my heart.",
        "In you, I've found the love of my life and my closest, truest friend.",
        "I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more.",
        "If I had a flower for every time I thought of you, I could walk in my garden forever."
    ],
    
    // Animation Settings
    animations: {
        hearts: {
            count: 30,
            speed: 2,
            size: 20
        },
        confetti: {
            count: 150,
            colors: ['#ff4d6d', '#ff758f', '#ff8fa3', '#ffb3c1', '#ffccd5']
        }
    },
    
    // Loading Simulation (for demo purposes)
    loading: {
        simulate: true,
        duration: 3000 // milliseconds
    },
    
    // Social Sharing
    sharing: {
        enabled: true,
        message: "Check out this beautiful Valentine's Day website made with love! ❤️",
        url: window.location.href
    },
    
    // Auto-play slideshow
    slideshow: {
        autoPlay: true,
        interval: 5000, // milliseconds
        transitionSpeed: 500 // milliseconds
    }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
