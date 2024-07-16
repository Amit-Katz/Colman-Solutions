
object ZAnomalyDetector extends AnomalyDetector {
  override def learn(normal: TimeSeries): Map[String, String] = {
    return Util.learnZ(normal.features, normal)
    // var map = Map[String, String]()
    // normal.features.foreach(feat => {
    //   val values = normal.getValues(feat).get.toArray
    //   var maxZ = Math.abs(Util.zscore(values, values.apply(0)))
    //   values.foreach(value => {
    //     val z = Math.abs(Util.zscore(values, value))
    //     if(z > maxZ) {
    //       maxZ = z
    //     }
    //   })
    //   map = map.updated(feat, maxZ.toString)
    // })
    // return map
  }

  override def detect(model: Map[String, String], test: TimeSeries): Vector[(String, Int)] = {
    return Util.detectZ(model, test)
    // var results: Vector[(String, Int)] = Vector()
    // test.features.foreach(feat => {
    //   val values = test.getValues(feat).get.toArray
    //   val maxZ = model.get(feat).get.toDouble
    //   values.zipWithIndex.foreach({case (value, i) => {
    //     val z = Math.abs(Util.zscore(values, value))
    //     if(z > maxZ) {
    //       results = results :+ (feat,i)
    //     }
    //   }
    //   })
    // })
    // return results
  }
}
