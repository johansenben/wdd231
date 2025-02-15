const reviewCount = parseInt(localStorage.getItem("reviewCount")) + 1 ?? 1;
localStorage.setItem("reviewCount", reviewCount);
document.querySelector("#review-count").textContent = `You have submitted ${reviewCount} review${reviewCount > 1 ? 's' : ''}!`;