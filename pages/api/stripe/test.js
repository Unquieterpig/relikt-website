export default async (req, res) => {
  const amount = req.body.amount;
  res.status(200).send({ with_tax: amount * 7 });
};
