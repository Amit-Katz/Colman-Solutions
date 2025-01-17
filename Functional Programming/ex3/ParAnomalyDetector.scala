import java.util.concurrent.{ExecutorService}
import scala.collection.mutable.ListBuffer
import java.util.concurrent.Callable

case class Report(feature: String, var timeStep: Int, anomalyScore: Double)

trait ParAnomalyDetector {
  type Reports = ListBuffer[Report]
  def map(ts: TimeSeries): Reports
  def reduce(r1: Reports, r2: Reports): Reports

  // implement
  def detect(ts: TimeSeries, es: ExecutorService, chunks: Int): Vector[Report] = {
    val tss = ts.split(chunks)
    val chunkSize = ts.length / chunks
    tss.map(t => es.submit(new Callable[Reports] {
      override def call(): ListBuffer[Report] = {
        map(t)
      }
    }))
      .map(f => f.get())
      .zipWithIndex
      .map(e => {
        val reports = e._1
        val i = e._2
        reports.toList.foreach(r => r.timeStep = r.timeStep + (i * chunkSize))
        reports
      })
      .toArray
      .reduce((r1, r2) => this.reduce(r1,r2))
      .toVector
  }
}

