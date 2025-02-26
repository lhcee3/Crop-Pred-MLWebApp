document.getElementById('fetchVideos').addEventListener('click', () => {
    const topic = document.getElementById('topics').value;
    const subtopic = document.getElementById('subtopics').value;
    const videoDisplay = document.getElementById('videoDisplay');
    videoDisplay.innerHTML = ""; // Clear previous videos

    if (!topic || !subtopic) {
        alert('Please select both a topic and a subtopic!');
        return;
    }

    // Sample YouTube video links for Movies, News, Music, and Sports
    const videoLinks = {
        movies: {
            worldwide: [
                { url: "https://youtu.be/5PSNL1qE6VY?si=7qazOuwzBlwZv5NK", thumbnail: "https://img.youtube.com/vi/5PSNL1qE6VY/0.jpg" },
                { url: "https://youtu.be/TcMBFSGVi1c?si=Wfvw86yXhHPzprvU", thumbnail: "https://img.youtube.com/vi/TcMBFSGVi1c/0.jpg" },
                { url: "https://youtu.be/d9MyW72ELq0?si=lz4b1ZGFyq54aCHK", thumbnail: "https://img.youtube.com/vi/d9MyW72ELq0/0.jpg" }
            ],
            indian:[
                { url: "https://youtu.be/x_7YlGv9u1g?si=FB64H7VQHYZN1HO2", thumbnail: "https://img.youtube.com/vi/x_7YlGv9u1g/0.jpg" },
                { url: "https://youtu.be/g3JUbgOHgdw?si=Qh14XaGolk4YZSny", thumbnail: "https://img.youtube.com/vi/g3JUbgOHgdw/0.jpg" },
                { url: "https://youtu.be/qD-6d8Wo3do?si=1bCiPf0iBaER-HA4", thumbnail: "https://img.youtube.com/vi/qD-6d8Wo3do/0.jpg" }
            ],
            korean: [
                { url: "https://youtu.be/SEUXfv87Wpk?si=0VCph8GEoHXpdDtB", thumbnail: "https://img.youtube.com/vi/SEUXfv87Wpk/0.jpg" },
                { url: "https://youtu.be/7PBIHkKi0wM?si=o7aAML3RLYqrt0UM", thumbnail: "https://img.youtube.com/vi/7PBIHkKi0wM/0.jpg" },
                { url: "https://youtu.be/l9Hu3Xocc-g?si=vTtSVEHFIpPihSfa", thumbnail: "https://img.youtube.com/vi/l9Hu3Xocc-g/0.jpg" }
            ],
            spanish: [
                { url: "https://youtu.be/ADQD_Zt7qpI?si=jqb72IbkZY72lv4N", thumbnail: "https://img.youtube.com/vi/ADQD_Zt7qpI/0.jpg" },
                { url: "https://youtu.be/jexrGdxNd6w?si=jiQsY76AsOTwZRDV", thumbnail: "https://img.youtube.com/vi/jexrGdxNd6w/0.jpg" },
                { url: "https://youtu.be/Bgw394ZKsis?si=kTsZHC9KFs1uJ_mL", thumbnail: "https://img.youtube.com/vi/Bgw394ZKsis/0.jpg" }
            ],
            chinese: [
                { url: "https://youtu.be/7MlTVsKHoC0?si=NbMm_KCSPM4brRLB", thumbnail: "https://img.youtube.com/vi/7MlTVsKHoC0/0.jpg" },
                { url: "https://youtu.be/klyyYsmzcNQ?si=aUJsWcKGIfjgfFF-", thumbnail: "https://img.youtube.com/vi/klyyYsmzcNQ/0.jpg" },
                { url: "https://youtu.be/GjrtxkuFBtk?si=nSku7yVgoCMwPtCF", thumbnail: "https://img.youtube.com/vi/GjrtxkuFBtk/0.jpg" }
            ]
        },
        news: {
            worldwide: [
                { url: "https://www.youtube.com/live/aJZxqZ6TQqQ?si=Kxnh6AxUMLSNIXTZ", thumbnail: "https://img.youtube.com/vi/aJZxqZ6TQqQ/0.jpg" },
                { url: "https://www.youtube.com/live/FgUMlTZxYcM?si=CiyXfzxP4edAxNa6", thumbnail: "https://img.youtube.com/vi/FgUMlTZxYcM/0.jpg" },
                { url: "https://www.youtube.com/live/JihAVsgNZbE?si=Sk7R9MDJ_d10Ml9c", thumbnail: "https://img.youtube.com/vi/JihAVsgNZbE/0.jpg" }
            ],
            indian: [
                { url: "https://www.youtube.com/live/rsYeOrtD2Wg?si=DWBzEB7fNdQjeGhZ", thumbnail: "https://img.youtube.com/vi/rsYeOrtD2Wg/0.jpg" },
                { url: "https://www.youtube.com/live/Dzn0Hqh8jXI?si=yiXB64tw55KX1pIR", thumbnail: "https://img.youtube.com/vi/Dzn0Hqh8jXI/0.jpg" },
                { url: "https://www.youtube.com/live/yRUhavd3Fro?si=Il_Xja1RW_r2LBAd", thumbnail: "https://img.youtube.com/vi/yRUhavd3Fro/0.jpg" }
            ],
            korean: [
                { url: "https://youtu.be/_ZNF4NDCrTM?si=Tega5FQS4d9MxOa9", thumbnail: "https://img.youtube.com/vi/_ZNF4NDCrTM/0.jpg" },
                { url: "https://youtu.be/GIC481VxVlE?si=E-JPKl844KHTkSNQ", thumbnail: "https://img.youtube.com/vi/GIC481VxVlE/0.jpg" },
                { url: "https://youtu.be/5XQnDeklX90?si=0VGfPCP5KDz9KIjH", thumbnail: "https://img.youtube.com/vi/5XQnDeklX90/0.jpg" }
            ],
            spanish: [
                { url: "https://youtu.be/kFWx2T-_6_I?si=uZSokoF3jrbdgW33", thumbnail: "https://img.youtube.com/vi/kFWx2T-_6_I/0.jpg" },
                { url: "https://youtu.be/CU8yQASQkKw?si=oLTWhNyqlo2BSht3", thumbnail: "https://img.youtube.com/vi/CU8yQASQkKw/0.jpg" },
                { url: "https://youtu.be/LRnYFjtObnU?si=V1RU4PcRTLgXcfb8", thumbnail: "https://img.youtube.com/vi/LRnYFjtObnU/0.jpg" }
            ],
            chinese: [
                { url: "https://youtu.be/8sxX--U4c8w?si=shsavA73o2CVVS1H", thumbnail: "https://img.youtube.com/vi/8sxX--U4c8w/0.jpg" },
                { url: "https://youtu.be/aWjYLYulALs?si=CtD0Jw22pr86F2jA", thumbnail: "https://img.youtube.com/vi/aWjYLYulALs/0.jpg" },
                { url: "https://youtu.be/YOgzobqcq1M?si=YlgUlWKBRy10XzMn", thumbnail: "https://img.youtube.com/vi/YOgzobqcq1M/0.jpg" }
            ]
        },
        music: {
            worldwide: [
                { url: "https://youtu.be/XqZsoesa55w?si=R9TDGGnFEgabCxjH", thumbnail: "https://img.youtube.com/vi/XqZsoesa55w/0.jpg" },
                { url: "https://youtu.be/kJQP7kiw5Fk?si=Kue_XWXH-0S5nxWQ", thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/0.jpg" },
                { url: "https://youtu.be/F4tHL8reNCs?si=5i6u3Wq501s0qwbe", thumbnail: "https://img.youtube.com/vi/F4tHL8reNCs/0.jpg" }
            ],
            indian:[
                { url: "https://youtu.be/AETFvQonfV8?si=-umZb3Cj1tPQlWwZ", thumbnail: "https://img.youtube.com/vi/AETFvQonfV8/0.jpg" },
                { url: "https://youtu.be/CZt-rVn2BJs?si=gGxBOD9zn3LR749o", thumbnail: "https://img.youtube.com/vi/CZt-rVn2BJs/0.jpg" },
                { url: "https://youtu.be/BBAyRBTfsOU?si=8RNLBrIF_iFQ9fqE", thumbnail: "https://img.youtube.com/vi/BBAyRBTfsOU/0.jpg" }
            ],
            korean: [
                { url: "https://youtu.be/9bZkp7q19f0?si=ESd3nGfNUlOuvvmB", thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/0.jpg" },
                { url: "https://youtu.be/IHNzOHi8sJs?si=Bv0QpJGYTtcY7sTe", thumbnail: "https://img.youtube.com/vi/IHNzOHi8sJs/0.jpg" },
                { url: "https://youtu.be/2S24-y0Ij3Y?si=xRtbR_3xrYOlw_f5", thumbnail: "https://img.youtube.com/vi/2S24-y0Ij3Y/0.jpg" }
            ],
            spanish: [
                { url: "https://youtu.be/kJQP7kiw5Fk?si=3JpMOFSym8QQhIEw", thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/0.jpg" },
                { url: "https://youtu.be/NUsoVlDFqZg?si=q5utvt8ppQJN0jgv", thumbnail: "https://img.youtube.com/vi/NUsoVlDFqZg/0.jpg" },
                { url: "https://youtu.be/1_zgKRBrT0Y?si=2yEyFKr16YeRWPeZ", thumbnail: "https://img.youtube.com/vi/1_zgKRBrT0Y/0.jpg" }
            ],
            chinese:[
                { url: "https://youtu.be/T4SimnaiktU?si=28K_0nPCGDYYZLVC", thumbnail: "https://img.youtube.com/vi/T4SimnaiktU/0.jpg" },
                { url: "https://youtu.be/bu7nU9Mhpyo?si=b1YYndsYg7yfghVG", thumbnail: "https://img.youtube.com/vi/bu7nU9Mhpyo/0.jpg" },
                { url: "https://youtu.be/wSBXfzgqHtE?si=xWOX4oKA607uwYA_", thumbnail: "https://img.youtube.com/vi/wSBXfzgqHtE/0.jpg" }
            ]
        },
        sports: {
            worldwide: [
                { url: "https://youtu.be/AETFvQonfV8?si=-umZb3Cj1tPQlWwZ", thumbnail: "https://img.youtube.com/vi/AETFvQonfV8/0.jpg" },
                { url: "https://youtu.be/CZt-rVn2BJs?si=gGxBOD9zn3LR749o", thumbnail: "https://img.youtube.com/vi/CZt-rVn2BJs/0.jpg" },
                { url: "https://youtu.be/BBAyRBTfsOU?si=8RNLBrIF_iFQ9fqE", thumbnail: "https://img.youtube.com/vi/BBAyRBTfsOU/0.jpg" }
            ],
            indian: [
                { url: "https://youtu.be/AETFvQonfV8?si=-umZb3Cj1tPQlWwZ", thumbnail: "https://img.youtube.com/vi/AETFvQonfV8/0.jpg" },
                { url: "https://youtu.be/CZt-rVn2BJs?si=gGxBOD9zn3LR749o", thumbnail: "https://img.youtube.com/vi/CZt-rVn2BJs/0.jpg" },
                { url: "https://youtu.be/BBAyRBTfsOU?si=8RNLBrIF_iFQ9fqE", thumbnail: "https://img.youtube.com/vi/BBAyRBTfsOU/0.jpg" }
            ],
            korean: [
                { url: "https://youtu.be/AETFvQonfV8?si=-umZb3Cj1tPQlWwZ", thumbnail: "https://img.youtube.com/vi/AETFvQonfV8/0.jpg" },
                { url: "https://youtu.be/CZt-rVn2BJs?si=gGxBOD9zn3LR749o", thumbnail: "https://img.youtube.com/vi/CZt-rVn2BJs/0.jpg" },
                { url: "https://youtu.be/BBAyRBTfsOU?si=8RNLBrIF_iFQ9fqE", thumbnail: "https://img.youtube.com/vi/BBAyRBTfsOU/0.jpg" }
            ],
            spanish: [
                { url: "https://youtu.be/AETFvQonfV8?si=-umZb3Cj1tPQlWwZ", thumbnail: "https://img.youtube.com/vi/AETFvQonfV8/0.jpg" },
                { url: "https://youtu.be/CZt-rVn2BJs?si=gGxBOD9zn3LR749o", thumbnail: "https://img.youtube.com/vi/CZt-rVn2BJs/0.jpg" },
                { url: "https://youtu.be/BBAyRBTfsOU?si=8RNLBrIF_iFQ9fqE", thumbnail: "https://img.youtube.com/vi/BBAyRBTfsOU/0.jpg" }
            ],
            chinese: [
                { url: "https://youtu.be/AETFvQonfV8?si=-umZb3Cj1tPQlWwZ", thumbnail: "https://img.youtube.com/vi/AETFvQonfV8/0.jpg" },
                { url: "https://youtu.be/CZt-rVn2BJs?si=gGxBOD9zn3LR749o", thumbnail: "https://img.youtube.com/vi/CZt-rVn2BJs/0.jpg" },
                { url: "https://youtu.be/BBAyRBTfsOU?si=8RNLBrIF_iFQ9fqE", thumbnail: "https://img.youtube.com/vi/BBAyRBTfsOU/0.jpg" }
            ]
        }
    };

    // Display videos with serial numbers
    if (videoLinks[topic] && videoLinks[topic][subtopic]) {
        videoLinks[topic][subtopic].forEach((video, index) => {
            const videoWrapper = document.createElement('div');
            videoWrapper.style.display = "flex";
            videoWrapper.style.alignItems = "center";
            videoWrapper.style.marginBottom = "15px";

            const serialNumber = document.createElement('span');
            serialNumber.textContent = `${index + 1}. `;
            serialNumber.style.fontSize = "1.2em";
            serialNumber.style.fontWeight = "bold";
            serialNumber.style.marginRight = "10px";

            const img = document.createElement('img');
            img.src = video.thumbnail;
            img.alt = "YouTube Video";
            img.style.cursor = "pointer";
            img.style.borderRadius = "10px";
            img.style.transition = "transform 0.3s ease";
            img.addEventListener('click', () => {
                window.open(video.url, '_blank');
            });

            img.addEventListener('mouseover', () => {
                img.style.transform = "scale(1.1)";
            });

            img.addEventListener('mouseout', () => {
                img.style.transform = "scale(1)";
            });

            videoWrapper.appendChild(serialNumber);
            videoWrapper.appendChild(img);
            videoDisplay.appendChild(videoWrapper);
        });
    } else {
        alert('No videos available for this topic and subtopic.');
    }
});
