import scala.collection.mutable

object LinearRegAnomalyDetector extends AnomalyDetector {
  val threshold = 0.9

  override def learn(normal: TimeSeries): Map[String, String] = {
    // var map = Map[String, String]()
    // val features = normal.features

    // Util.correlatedFeatures(normal, threshold).foreach((firstFeatIndex, secondFeatIndex, pearson) => {
    //   val firstFeatValues = normal.getValues(features.apply(firstFeatIndex)).get
    //   val secondFeatValues = normal.getValues(features.apply(secondFeatIndex)).get
    //   val points = firstFeatValues.zip(secondFeatValues).map({case (x,y) => new Point(x,y)})
    //   val line = new Line(points.toArray)
    //   val maxDistanceFromLine = points.map(p => line.dist(p)).max

    //   map = map.updated(
    //     features.apply(firstFeatIndex) + "," + features.apply(secondFeatIndex),
    //     line.a + "," + line.b + "," + maxDistanceFromLine
    //   )
    // })

    // return map
    return Util.learnLinear(Util.correlatedFeatures(normal, threshold), normal)
  }

  override def detect(model: Map[String, String], test: TimeSeries): Vector[(String, Int)] = {
    return Util.detectLinear(model, test)
    // var results: Vector[(String, Int)] = Vector()
    // model.foreach((correlatedFeatures: String, info: String) => {
    //   val firstFeat = correlatedFeatures.split(",").apply(0)
    //   val secondFeat = correlatedFeatures.split(",").apply(1)
    //   val lineA = info.split(",").apply(0).toDouble
    //   val lineB = info.split(",").apply(1).toDouble
    //   val maxDist = info.split(",").apply(2).toDouble
      
    //   val firstFeatValues = test.getValues(firstFeat).get.toArray
    //   val secondFeatValues = test.getValues(secondFeat).get.toArray

    //   firstFeatValues.zip(secondFeatValues).zipWithIndex.foreach({case ((firstFeatVal,secondFeatVal),i) => {
    //       val dist = Math.abs((lineA * firstFeatVal + lineB) - secondFeatVal)
    //       if (dist > maxDist) {
    //         // This is an anomaly
    //         results = results :+ (correlatedFeatures,i)
    //       }
    //     }
    //   })
    // })

    // return results
  }
}
