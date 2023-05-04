const express = require('express');
const router = express.Router();
const activities = require('../services/activity');

let success = 'Success'

router.get('/', async function(req, res, next) {
  try {
    const activityList = await activities.getActivities();
    res.status(200).json({ status: success, message: success, ...activityList });
  } catch (err) {
    console.error(`Error while getting list of activities: `, err.message);
    res.status(400).json({ message: 'Error while getting list of activities: ' + err.message });
  }
});

router.get('/:id', async function(req, res, next) {
  try {

    const oneActivity = await activities.getOneActivities(req.params.id);
    if (oneActivity.data.length === 0) {
      res.status(400).json({status: "Not Found", message: "Activity with ID " + req.params.id + " Not Found"});
      return;
    }

    res.status(200).json({ status: success, message: success, ...oneActivity });
  } catch (err) {
    console.error(`Error while getting list of activities: `, err.message);
    res.status(400).json({message: 'Error while getting list of activities: ' + err.message});
  }
});

router.post('/', async function(req, res, next) {
  const { email, title } = req.body;
  try {

    const result = await activities.createActivity(title,email);

    res.status(200).json({status: success, message: success, ...result });
  } catch (err) {
    console.error(`Error in creating activity: `, err.message);
    res.status(400).json({message: 'Error in creating activity: ' + err.message});
  }
});

router.patch('/:id', async function(req, res, next) {
  const { title } = req.body;
  try {
    // const oneActivity = await activities.getOneActivities(req.params.id);
    // if (oneActivity.data.length === 0) {
    //   res.status(400).json({status: "Not Found", message: "Activity with ID " + req.params.id + " Not Found"});
    //   return;
    // }
    
    const result = await activities.patchActivity(title,req.params.id);
    res.status(200).json({status: success, message: success, ...result });

  } catch (err) {
    console.error(`Error in creating activity: `, err.message);
    res.status(400).json({message: 'Error in creating activity: ' + err.message});
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    const oneActivity = await activities.getOneActivities(req.params.id);
    if (oneActivity.data.length === 0) {
      res.status(400).json({status: "Not Found", message: "Activity with ID " + req.params.id + " Not Found"});
      return;
    }

    const result = await activities.deleteActivity(req.params.id);
    res.status(200).json({status: success, message: success, data: {}});

  } catch (err) {
    console.error(`Error in creating activity: `, err.message);
    res.status(400).json({message: 'Error in creating activity: ' + err.message});
  }
});
  
module.exports = router;