package com.nftcar.alyra.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A FeePool.
 */
@Entity
@Table(name = "fee_pool")
public class FeePool implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "montant_collecte", precision = 21, scale = 2, nullable = false)
    private BigDecimal montantCollecte;

    @Column(name = "montant_redistribue", precision = 21, scale = 2)
    private BigDecimal montantRedistribue;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public FeePool id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getMontantCollecte() {
        return this.montantCollecte;
    }

    public FeePool montantCollecte(BigDecimal montantCollecte) {
        this.setMontantCollecte(montantCollecte);
        return this;
    }

    public void setMontantCollecte(BigDecimal montantCollecte) {
        this.montantCollecte = montantCollecte;
    }

    public BigDecimal getMontantRedistribue() {
        return this.montantRedistribue;
    }

    public FeePool montantRedistribue(BigDecimal montantRedistribue) {
        this.setMontantRedistribue(montantRedistribue);
        return this;
    }

    public void setMontantRedistribue(BigDecimal montantRedistribue) {
        this.montantRedistribue = montantRedistribue;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FeePool)) {
            return false;
        }
        return id != null && id.equals(((FeePool) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FeePool{" +
            "id=" + getId() +
            ", montantCollecte=" + getMontantCollecte() +
            ", montantRedistribue=" + getMontantRedistribue() +
            "}";
    }
}
