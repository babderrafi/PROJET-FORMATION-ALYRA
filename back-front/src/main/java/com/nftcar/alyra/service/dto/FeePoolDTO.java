package com.nftcar.alyra.service.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.nftcar.alyra.domain.FeePool} entity.
 */
public class FeePoolDTO implements Serializable {

    private Long id;

    @NotNull
    private BigDecimal montantCollecte;

    private BigDecimal montantRedistribue;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getMontantCollecte() {
        return montantCollecte;
    }

    public void setMontantCollecte(BigDecimal montantCollecte) {
        this.montantCollecte = montantCollecte;
    }

    public BigDecimal getMontantRedistribue() {
        return montantRedistribue;
    }

    public void setMontantRedistribue(BigDecimal montantRedistribue) {
        this.montantRedistribue = montantRedistribue;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FeePoolDTO)) {
            return false;
        }

        FeePoolDTO feePoolDTO = (FeePoolDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, feePoolDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FeePoolDTO{" +
            "id=" + getId() +
            ", montantCollecte=" + getMontantCollecte() +
            ", montantRedistribue=" + getMontantRedistribue() +
            "}";
    }
}
