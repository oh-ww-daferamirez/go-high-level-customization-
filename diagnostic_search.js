/**
 * GoHighLevel Customization - ARM Project
 * DIAGNOSTIC SCRIPT (Run this in the Browser Console - F12)
 *
 * This script will find every element with the Default Blue background (#000675 or similar)
 * and alert/log its specific ID and CLASS.
 */

(function () {
    // Known GHL Blue variations (computed values)
    const badBlues = [
        'rgb(0, 6, 117)',   // #000675
        'rgb(24, 26, 141)', // #181a8d
        'rgb(69, 81, 216)', // #4551d8
        '#000675', '#181a8d'
    ];

    function isBadBlue(colorStr) {
        if (!colorStr) return false;
        const clean = colorStr.replace(/\s/g, '');
        return badBlues.some(bb => clean === bb.replace(/\s/g, ''));
    }

    console.group("ARM Diagnostic: Hunting Blue Elements...");

    // Scan body descendants
    const elements = document.querySelectorAll('*');
    let foundCount = 0;

    elements.forEach(el => {
        const style = window.getComputedStyle(el);
        const bg = style.backgroundColor;

        if (isBadBlue(bg)) {
            foundCount++;
            console.log("---- Found Blue Element ----");
            console.log("Tag:", el.tagName);
            console.log("ID:", el.id || "(no id)");
            console.log("Classes:", el.className);
            console.log("Element:", el);

            // Highlight it temporarily (Red Border)
            el.style.border = "5px solid red";
        }
    });

    console.groupEnd();

    if (foundCount > 0) {
        alert(`Found ${foundCount} elements with the Blue Background. Check the Console (F12) to see exactly which ones.`);
    } else {
        alert("No elements with the standard GHL Blue found. The color might be slightly different or an image.");
    }
})();
