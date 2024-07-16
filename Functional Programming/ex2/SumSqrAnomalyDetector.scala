
import scala.collection.mutable

object SumSqrAnomalyDetector extends  AnomalyDetector {
    val threshold = 0.9

    override def learn(normal: TimeSeries): Map[String, String] = {
        // var map = Map[String, String]()
        // val features = normal.features

        // Util.correlatedFeatures(normal, threshold).foreach((firstFeatName, secondFeatName, pearson) => {
        // val firstFeatValues = normal.getValues(firstFeatName).get
        // val secondFeatValues = normal.getValues(secondFeatName).get
        // val points = firstFeatValues.zip(secondFeatValues).map({case (x,y) => new Point(x,y)})
        // val line = new Line(points.toArray)
        // val maxSqrSum = points.map(p1 => points.map(p2 => Util.sqrDist(p1, p2)).sum).max

        // map = map.updated(
        //     firstFeatName + "," + secondFeatName,
        //     line.a + "," + line.b + "," + maxSqrSum
        //     )
        // })
    
        // return map
        return Util.learnSumSqr(Util.correlatedFeatures(normal, threshold), normal)
    }

    override def detect(model: Map[String, String], test: TimeSeries): Vector[(String, Int)] = {
        return Util.detectSumSqr(model, test)
        // var results: Vector[(String, Int)] = Vector()
        // model.foreach((correlatedFeatures: String, info: String) => {
        //     val firstFeat = correlatedFeatures.split(",").apply(0)
        //     val secondFeat = correlatedFeatures.split(",").apply(1)
        //     val lineA = info.split(",").apply(0).toDouble
        //     val lineB = info.split(",").apply(1).toDouble
        //     val maxSqrSum = info.split(",").apply(2).toDouble
            
        //     val firstFeatValues = test.getValues(firstFeat).get.toArray
        //     val secondFeatValues = test.getValues(secondFeat).get.toArray

        //     val points = firstFeatValues.zip(secondFeatValues).map({case (x, y) => Point(x,y)})

        //     points.zipWithIndex.foreach({case (p1,i) => {
        //         val sqrSum = points.map(p2 => Util.sqrDist(p1, p2)).sum
        //         if (sqrSum > maxSqrSum) {
        //         // This is an anomaly
        //         results = results :+ (correlatedFeatures,i)
        //         }}
        //     })
        // })

        // return results
    }
}
