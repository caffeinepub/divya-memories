# Divya Memories

## Current State
New project. Empty Motoko backend and no frontend yet.

## Requested Changes (Diff)

### Add
- Password protection page (password: "53")
- Welcome page with romantic text for Divya
- 7 memory pages using uploaded real photos (all late-night video call moments)
- Mid message page
- Final promise page with two buttons
- Floating hearts/stars animation throughout
- Smooth page transitions

### Modify
- N/A (new project)

### Remove
- N/A

## Implementation Plan

### Backend
- Simple password check function: verifyPassword(pass: Text) -> Bool

### Frontend Pages (in order)
1. **Password Page** — input field, submit button, wrong password shake animation
2. **Welcome Page** — "Divya, ye raaton ki yaadein… meri sabse pyari duniya hain ❤️" + Enter button
3. **Memory Page 1** — Image: whatsapp_image_2026-03-30_at_01.23.39 (dark, red outfit sleeping)
   - Caption: "Jab tum chup chaap so rahi hoti ho… main bas tumhe dekh kar sukoon mehsoos karta hoon ❤️"
   - Sub: "29 March 2026 • Raat ke baad..."
4. **Memory Page 2** — Image: whatsapp_image_2026-03-30_at_01.23.38 (red outfit, white pillow, video call)
   - Caption: "In raaton mein na koi shor hota hai… bas tum aur meri feelings hoti hain 🌙"
   - Sub: "Tumhare bagair ye raatein adhuri hain..."
5. **Memory Page 3** — Image: whatsapp_image_2026-03-30_at_01.23.40 (VIDEO CALL screenshot — Divyuuuu 🫀❤️, phone time 1:32 AM, call duration 02:38:27)
   - Caption: "Ye wo raat hai jab neend se zyada tum zaroori thi 💫"
   - Sub: "1:32 AM • 2 ghante 38 minute ki call 💕"
6. **Memory Page 4** — Image: whatsapp_image_2026-03-30_at_01.23.41 (sleeping, gold floral bedsheet)
   - Caption: "Tumhara yun so jaana... aur main ghanton tak jaagta reh jaata hoon 🌙"
   - Sub: "Teri neend mujhe chain deti hai..."
7. **Memory Page 5** — Image: whatsapp_image_2026-03-30_at_01.23.40_1 (close-up dark, gold bedsheet)
   - Caption: "Tumhari ye masoomiyat hi meri sabse badi weakness hai 🥺"
   - Sub: "Is chehra ko dekhta hun toh sab bhool jaata hun..."
8. **Memory Page 6** — Image: whatsapp_image_2026-03-30_at_01.23.40_2 (sleeping, strawberry print)
   - Caption: "Har raat ye feeling… ki kaash main wahan hota tumhare paas 💫"
   - Sub: "Door ho ke bhi, dil ke paas ho tum..."
9. **Memory Page 7** — Image: whatsapp_image_2026-03-30_at_01.23.41_1 (lavender blanket close-up, peaceful)
   - Caption: "Is neend mein kitna sukoon hai tumhara… kash main hamesha aise dekh sakta 🥺❤️"
   - Sub: "Meri jaan, meri duniya..."
10. **Mid Message Page** — "Har raat tumhe dekhna… meri aadat ban chuki hai ❤️"
11. **Final Promise Page** — Full promise text + "Hamesha ❤️" and "Forever ♾️" buttons

### Design
- Background: deep navy/black (#0a0a1a)
- Text: soft white with rose-gold glow
- Animated floating hearts and stars
- Smooth fade/slide transitions between pages
- Mobile-first, full viewport height pages
- Soft vignette on images
