## Highlights

- Web-native techs - html, css.
- [DateRange](components/DateRange/DateRange.tsx) is an optionally controlled functional component; settled with a different browser/locale based date-format in the input-control. Added a control to reset the range.
- CSS features such as grid (for example [MobileEmailCard](components/MobileEmailCard/MobileEmailCard.scss) and [EmailCard](components/MobileCard/MobileCard.scss)), flex, float for laying out.
- CSS-transform such as in stating expanded/folded body or multipurpose use icon-pngs (for example, [ArrowText](components/ArrowText/ArrowText.scss)).
- One of the interesting components ([EmailTo](components/EmailTo/EmailTo.tsx)) devloped so far in the project - basically hides/complements the text with ellipsis after a given character length(approx).
- [Emails data](routes/Home/emails.ts) is generated offline. And is [server-side added](pages/index.tsx) to the app-tree.
- Typescript for static-type checking.
- Prettier and ESlint for further beautification and static error checking; Using `airbnb` style-guide.
- SASS for writing css.
- CSS media queries to deal with responsiveness.
- SVG to react-component (clip_icon.svg).
