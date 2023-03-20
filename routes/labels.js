const express = require('express');
const router = express.Router();
const Review = require('../models/Review');


// @desc    Send random unlabeled review to label
// @route   GET /labels/
// @access  Public
router.get("/", async (req, res, next) => {
    try {
        const randomReview = await Review.aggregate([
            { $match: { "worker0": null } },
            { $sample: { size: 1 } }
        ])
        res.status(200).json(randomReview);        
    } catch (error) {
        next(error);
    };
});

// @desc    Update review and send next label
// @route   PUT /labels/:reviewId
// @access  Public
router.put("/:reviewLabelId", async (req, res, next) => {
    const { reviewLabelId } = req.params;
    try {
        const updatedReviewLabel = await Review.findByIdAndUpdate(reviewLabelId, req.body, { new: true });
        res.status(204).json(updatedReviewLabel);    
    } catch (error) {
        next(error);
    };
});


module.exports = router;