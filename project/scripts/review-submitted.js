const reviewCount = parseInt(localStorage.getItem("reviewCount")) ?? 0;
if ((!typeof reviewCount == Number))
    reviewCount = 1;
localStorage.setItem("reviewCount", reviewCount + 1);
document.querySelector("#review-count").textContent = `You have submitted ${reviewCount + 1} review${reviewCount > 0 ? 's' : ''}!`;