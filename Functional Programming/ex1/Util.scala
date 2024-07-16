import scala.runtime.Nothing$

object Util {

  // max
  def max[A](elements: List[A], maxFunc: (A, A) => Int): A = elements match {
    case Nil => throw new RuntimeException("max of empty list")
    case head :: Nil => head
    case head :: tail =>
      val maxTail = max(tail, maxFunc)
      if (maxFunc(head, maxTail) >= 0) head else maxTail
  }

  // map
  def map[A, B, C](elements: List[A], aToB: A => B, bToC: B => C): List[C] = {
    if (elements == Nil) return Nil
    return elements.map(aToB).map(bToC)
  }

  // isSorted
  def isSorted[A](elements: List[A], sortFunc: (A, A) => Boolean): Boolean = {
    if (elements == Nil) return true
    if (elements.tail == Nil) return true
    if (!isSorted(elements.tail, sortFunc)) return false
    return sortFunc(elements.head, elements.tail.head)
  }

  // probs
  def probs(elements: Array[Double]): Array[Double] = {
    val size = elements.size.doubleValue
    val grouped = elements.groupBy(identity).mapValues(_.size)
    return elements.map(grouped(_) / size)
  }

  // entropy
  def entropy(elements: Array[Double]): Double = {
    def log2(num: Double): Double = {
      return Math.log10(num) / Math.log10(2)
    }

    def singleEnt(num: Double): Double = {
      return num * log2(num)
    }

    val entropys = probs(elements).map(singleEnt)
    val zipped = elements.zip(entropys)
    val tu = zipped.distinct
    val sum = tu.map({case (x,y) => y}).sum

    return -1 * sum
  }

  // mu
  def mu(elements: Array[Double]): Double = {
    val probes = probs(elements)
    val a = elements.zip(probes).distinct
    val mul = a.map({ case (x, y) => x * y })

    return mul.sum
  }

  // variance
  def variance(elements: Array[Double]): Double = {
    val probes = probs(elements)
    val mu = Util.mu(elements)
    val a = elements.zip(probes).distinct
    val variance = a.map({ case (element, prob) => prob * math.pow((element - mu), 2) })

    return variance.sum
  }

  // zscore
  def zscore(elements: Array[Double], x: Double): Double = {
    var mu = Util.mu(elements)
    var variance = Util.variance(elements)
    var div = Math.sqrt(variance)

    return (x - mu)/div
  }

  // cov
  def cov(elementsX: Array[Double], elementsY: Array[Double]): Double = {
    val elementsXY = elementsX.zip(elementsY).map({case (x, y) => x * y});
    val muXY = Util.mu(elementsXY)
    val muX = Util.mu(elementsX)
    val muY = Util.mu(elementsY)

    return muXY - (muX * muY)
  }

  // pearson
  def pearson(elementsX: Array[Double], elementsY: Array[Double]): Double = {
    var varianceX = Util.variance(elementsX)
    var divX = Math.sqrt(varianceX)

    var varianceY = Util.variance(elementsY)
    var divY = Math.sqrt(varianceY)

    var cov = Util.cov(elementsX, elementsY)
    return cov / (divX * divY);
  }
}