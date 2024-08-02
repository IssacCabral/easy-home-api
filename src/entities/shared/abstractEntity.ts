export abstract class AbstractEntity<T> {
	protected constructor(protected readonly props: T) {}

	public export(): T {
		return { ...this.props };
	}
}
